import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeliveryAddressComponent } from '../dialog-delivery-address/dialog-delivery-address.component';
import { IDeliveryDetails } from '../interfaces/idelivery-details';
import { IOrder } from '../interfaces/iorder';
import { IOrderTotals } from '../interfaces/iorder-totals';
import { CrudResponse } from '../models/crud-response';
import { RedirectModel } from '../models/redirect-model';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  deliveryDetails: IDeliveryDetails = { isValidDeliveryDetails: false };
  model: CrudResponse<IOrder>;
  orderTotals: IOrderTotals;
  loaded: boolean = false;
  
  constructor( private router: Router, private orderService: OrderService, private activatedRoute: ActivatedRoute, 
    private cartService: ShoppingCartService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {  
      this.cartService.getShoppingCart(+params.get('id'), params.get('code'))
      .subscribe(res => {
        console.log(res);
        this.model = res;
        this.deliveryDetails = {        
          isValidDeliveryDetails : res.returnValue.isValidDeliveryDetails        
        }
        if(res.returnValue.isValidDeliveryDetails){
          this.deliveryDetails.countyId = res.returnValue.deliveryCounty.id;
          this.deliveryDetails.deliveryCounty = res.returnValue.deliveryCounty?.name;        
          this.deliveryDetails.deliveryAddress = res.returnValue.deliveryAddress;
          this.deliveryDetails.deliveryPhone = res.returnValue.deliveryPhone;
          this.deliveryDetails.eirCode = res.returnValue.eirCode;
        }        
        this.updateTotals(res.returnValue);
        this.loaded = true;
      },
      (error) => {
        console.log(error);
      });  
    }); 
  }

  enterAddress(){
    if(this.authService.isLoggedIn())
      this.openDialog();
    else{
      this.activatedRoute.paramMap.subscribe(params => {  
        const redirectModel : RedirectModel = {
          buttonText: "Proceed to checkout",
          redirectUri: "/delivery/" + params.get('id') + "/" + params.get('code'),
          message: 'You have successfully authenticated.  You can proceed to checkout and finalise your order'
        }
        sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));
        this.router.navigateByUrl('/login');
      });  
    } 
  }

  backToCart(){   
      this.router.navigateByUrl('/summary/' + this.model.returnValue.id + '/' + this.model.returnValue.orderCode);   
  }

  checkOut(){
      this.activatedRoute.paramMap.subscribe(params => { 
        if(!this.authService.isLoggedIn())
        {
          const redirectModel : RedirectModel = {
            buttonText: "Proceed to checkout",
            redirectUri: "/checkout/" + params.get('id') + "/" + params.get('code'),
            message: 'You have successfully authenticated.  You can proceed to checkout and finalise your order'
          }
          sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));
          this.router.navigateByUrl('/login');
        }
        this.orderService.customerCompleteOrder(this.model.returnValue.orderCode)
        .subscribe(res => {
          console.log(res);      
          if(res.success){       
            this.router.navigateByUrl("/checkout/" + params.get('id') + "/" + params.get('code')); 
          }
        },
        (error) => {
          console.log(error);
        });        
      });
  }

  openDialog() : void {
   const dialogRef = this.dialog.open(DialogDeliveryAddressComponent, {
     width: '475px',
     data: this.deliveryDetails 
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     if(!result)
       return;

     this.orderService.updateDeliveryAddress( this.model.returnValue.orderCode, result)
     .subscribe(res => {
       console.log(res);
       if(res.success){
         this.deliveryDetails.deliveryAddress = res.returnValue.deliveryAddress;
         this.deliveryDetails.deliveryPhone = res.returnValue.deliveryPhone;
         this.deliveryDetails.countyId = res.returnValue.deliveryCountyId;
         this.deliveryDetails.eirCode = res.returnValue.eirCode;
         this.deliveryDetails.deliveryCounty = res.returnValue.deliveryCounty?.name;
         this.deliveryDetails.isValidDeliveryDetails = res.returnValue.isValidDeliveryDetails;
         this.updateTotals(res.returnValue);
         this.model.returnValue.isValidDeliveryDetails = true;
       }
     },
     (error) => {
       console.log(error);
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
}
