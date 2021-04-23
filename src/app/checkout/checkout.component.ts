import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { IOrderTotals } from '../interfaces/iorder-totals';
import { IOrder } from '../interfaces/iorder';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStripeChargeRequest } from '../interfaces/istripe-charge-request';


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
        private router: Router,  private cartService: ShoppingCartService, 
        private orderService: OrderService, private fb:FormBuilder,private stripeService: StripeService ) { }

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
    this.paymentFailed = false;
    const name = this.stripeForm.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {        
          console.log(result.token.id);
          const chargeModel: IStripeChargeRequest = {
            orderCode : this.orderCode,
            source: result.token.id
          };

          this.orderService.chargeOrder(chargeModel)
          .subscribe(res => {
            console.log(res);       
            if(res.success){
              const redirectModel = {
                message : 'Thank you for your order.  A confirmation email has been sent to you.',
                buttonText : 'Home',
                redirectUri : '/categories' 
              }
              sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));
              localStorage.removeItem('orderId');
              localStorage.removeItem('orderCode');
              this.router.navigateByUrl('/success');
            }
            else{
              this.paymentFailed = true;
              this.paymentError = "Failed to charge your card, please try again"
            }
          },
          (error) => {
            console.log(error);
            this.paymentFailed = true;
            this.paymentError = "Payment failed, please try again."
          }); 

        } else if (result.error) {
          // Error creating the token
          this.paymentFailed = true;
          this.paymentError = "Payment failed, please try again."
          console.log(result.error.message);
        }
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