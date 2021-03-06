import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../interfaces/iorder';
import { CrudResponse } from '../models/crud-response';
import { IOrderTotals } from '../interfaces/iorder-totals';
import { AuthService } from '../services/auth.service';
import { RedirectModel } from '../models/redirect-model';
import { OrderService } from '../services/order.service';
import { IDeliveryDetails } from '../interfaces/idelivery-details';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeliveryAddressComponent } from '../dialog-delivery-address/dialog-delivery-address.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  model: CrudResponse<IOrder>;
  isLoading: boolean  = true;
  orderTotals: IOrderTotals;  
  constructor(private cartService: ShoppingCartService, private activatedRoute: ActivatedRoute, 
    private router: Router, private authService: AuthService, private orderService: OrderService, 
    private spinner: NgxSpinnerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.paramMap.subscribe(params => { 
      this.cartService.getShoppingCart(+params.get('id'), params.get('code'))
      .subscribe(res => {
        console.log(res);
        this.model = res;
        this.updateTotals(res.returnValue);
        this.isLoading = false;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.spinner.hide();
      });  
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
  
  addQuantity(id: number){
    this.spinner.show();
    const orderProduct = this.model.returnValue.orderCompanyProducts.filter(pdct => pdct.id == id);
    this.cartService.updateOrderProduct(this.model.returnValue.orderCode, id , orderProduct[0].quantity+1 )
      .subscribe(res => {
        console.log(res);
        if(res.success){
          orderProduct[0].quantity++;
          orderProduct[0].displayTotal = "???" + ((orderProduct[0].quantity * orderProduct[0].companyProduct.product.price) / 100).toFixed(2);
          this.updateTotals(res.returnValue);
          this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      });
  }

  reduceQuantity(id: number){
    const orderProduct = this.model.returnValue.orderCompanyProducts.filter(pdct => pdct.id == id);
    if( orderProduct[0].quantity > 1){
      this.spinner.show();
      this.cartService.updateOrderProduct(this.model.returnValue.orderCode, id , orderProduct[0].quantity-1 )
      .subscribe(res => {
        console.log(res);
        if(res.success){
          orderProduct[0].quantity--;
          orderProduct[0].displayTotal =  "???" + (( orderProduct[0].quantity *  orderProduct[0].companyProduct.product.price) / 100).toFixed(2);
          this.updateTotals(res.returnValue);
          this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      });
    }       
  }

  deleteOrderProduct(id: number){
    this.spinner.show();
    this.cartService.deleteOrderProduct(this.model.returnValue.orderCode, id)
    .subscribe(res => {
      console.log(res);
      this.model = res;
      if(res.success){
        this.updateTotals(res.returnValue);
        this.spinner.hide();
      }
    },
    (error) => {
      console.log(error);
      this.spinner.hide();
    }); 
  }

  delivery(){    
    if(!this.authService.isLoggedIn())
    {
      this.activatedRoute.paramMap.subscribe(params => {  
        const redirectModel : RedirectModel = {
          buttonText: "Proceed to checkout",
          redirectUri: '/delivery/' + this.model.returnValue.id + '/' + this.model.returnValue.orderCode,
          message: 'You have successfully authenticated.  You can proceed to checkout and finalise your order'
        }
        sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));
        this.router.navigateByUrl('/login');
      });
    }   
    this.router.navigateByUrl('/delivery/' + this.model.returnValue.id + '/' + this.model.returnValue.orderCode);  
  }

  backToList(){
     this.router.navigateByUrl("/categories");
  } 
}
