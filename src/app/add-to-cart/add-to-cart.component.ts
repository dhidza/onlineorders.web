import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { IOrderProduct } from '../interfaces/iorder-product';
import { ReturnStatement } from '@angular/compiler';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogCartUpdateComponent } from '../dialog-cart-update/dialog-cart-update.component';
import { IOrder } from '../interfaces/iorder';
import { SharedCartUpdateService } from '../services/shared-cart-update.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  model : IOrderProduct;  
  categoryId: string;
  loading: boolean = true;  
  constructor(private cartService: ShoppingCartService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private router: Router, public dialog: MatDialog, private sharedCartService: SharedCartUpdateService) {    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'))
      this.categoryId = params.get('id');
      this.cartService.getOrderProduct(+params.get('id'))
      .subscribe(res => {
        console.log(res);
        this.loading = false;
        if(res.success){
          this.model = res.returnValue;            
          localStorage.setItem("orderId", this.model.orderId.toString());
          localStorage.setItem("orderCode", this.model.orderCode);
        }          
      },
      (error) => {
        console.log(error);
      }).unsubscribe();  
    });  
  }

  addQuantity(){
    this.model.quantity++;
    this.model.displayTotal =  "€" + ((this.model.quantity * this.model.companyProduct.product.price) / 100).toFixed(2);
  }
  reduceQuantity(){
   if(this.model.quantity > 1)
      this.model.quantity--;

    this.model.displayTotal =  "€" + ((this.model.quantity * this.model.companyProduct.product.price) / 100).toFixed(2);    
  }
  addToCart(){
    this.spinner.show();
    this.cartService.addProductToOrder(this.model)
    .subscribe(res => {
      console.log(res);  
      this.sharedCartService.updateBasketCount(res.returnValue.totalQuantity);
      this.spinner.hide();
      this.openDialog(res.returnValue, res.success);      
    },
    (error) => {
      console.log(error);
      this.spinner.hide();
    }).unsubscribe();
  }

  backToList(){
    this.router.navigateByUrl('/products/' + this.model.companyProduct.product.categoryId);
  }

  openDialog(order: IOrder, success: boolean) : void {
    const dialogRef = this.dialog.open(DialogCartUpdateComponent, {
      width: '475px',
      data: { order: order, orderProduct: this.model, success: success }
    });

    dialogRef.afterClosed().subscribe(checkoutClick => {
      if(!checkoutClick || checkoutClick != -1000)
        this.router.navigateByUrl('/products/' + this.model.companyProduct.product.categoryId);      
    });
  }
}
