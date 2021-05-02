import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { IOrderTotals } from '../interfaces/iorder-totals';
import { IOrder } from '../interfaces/iorder';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStripeChargeRequest } from '../interfaces/istripe-charge-request';
import { PaymentIntentStateEnum } from '../interfaces/istripe-charge-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedCartUpdateService } from '../services/shared-cart-update.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  stripeForm: FormGroup;
  orderTotals: IOrderTotals;

  loading: boolean = true;
  paymentError: string;
  paymentFailed: boolean = false;
  orderCode: string = '';
  constructor( private activatedRoute: ActivatedRoute, 
        private router: Router,  private cartService: ShoppingCartService, private spinner: NgxSpinnerService,
        private orderService: OrderService, private sharedCartService: SharedCartUpdateService, 
        private fb:FormBuilder,private stripeService: StripeService ) { }

  ngOnInit(): void { 
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.activatedRoute.paramMap.subscribe(params => {  
      this.orderCode = params.get('code');
      this.cartService.getShoppingCart(+params.get('id'), params.get('code'))
      .subscribe(res => {
        console.log(res);       
        this.updateTotals(res.returnValue);
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });  
    }); 
  }

  completePayment(){
    this.spinner.show();
    this.paymentFailed = false;
    const name = this.stripeForm.get('name').value;
    if(!this.stripeForm.valid)
    {
      this.paymentFailed = true;
      this.paymentError = "Failed to confirm payment, please try again";
      return;
    }
    this.orderService.initiateOrder(this.orderCode)
    .subscribe(res => {    
      if(res.success){
        this.stripeService
        .confirmCardPayment(res.returnValue.paymentReference, {
          payment_method: {
            card: this.card.element
          }
        })
        .subscribe((result) => {
          console.log(result);
           if(result.error){
            console.log(result.error);
            this.paymentFailed = true;
            this.paymentError = result.error.message   
            this.spinner.hide();
            return;
           }
           else{
            this.orderService.chargeOrder({
              orderCode : this.orderCode,
              source: result.paymentIntent.id
            })
            .subscribe(res => { 
              const redirectModel = {
                message : 'Thank you for your order.  A confirmation email has been sent to you.',
                buttonText : 'Home',
                redirectUri : '/home' 
               }
               sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));
               localStorage.removeItem('orderId');
               localStorage.removeItem('orderCode');
               this.sharedCartService.updateBasketCount(0);
               this.spinner.hide();
               this.router.navigateByUrl('/success');
            }, (error) =>{
                //this should never ever happen
                console.log(error);
                this.spinner.hide();
            });  
           }
        },
        (error) => {
          console.log(error);
          this.paymentFailed = true;
          this.paymentError = "Failed to confirm payment, please try again"
          this.spinner.hide();
        });
      }
      else{
        this.paymentFailed = true;
        this.paymentError = "Critical error, You cannot complete this order.  Please click contact support to resolve";
        this.spinner.hide();
      }
    },
    (error) => {
      console.log(error);
      this.paymentFailed = true;
      this.paymentError = "Critical error, You cannot complete this order.  Please click contact support to resolve"
      this.spinner.hide();
    });    
  }
  private updateTotals(order: IOrder) {
    this.orderTotals = {
      orderTotal:order.totalOrderDisplay,
      productTotal: order.totalProductDisplay,
      serviceFee: order.deliveryCounty?.serviceFeeDisplay,
      deliveryFee: order.deliveryCounty?.deliveryFeeDisplay,
      totalQuantity: order.totalQuantity
    };
  }
}