import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectModel } from '../models/redirect-model';
import { AuthService } from '../services/auth.service';
import { SharedCartUpdateService } from '../services/shared-cart-update.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss']
})
export class NavLinksComponent implements OnInit, AfterContentChecked {

  basketCount: number;
  constructor(private router: Router, private sharedCartService: SharedCartUpdateService, 
    public authService: AuthService, private cartService: ShoppingCartService, private activatedRoute: ActivatedRoute) {      
     }

  ngOnInit(): void {
      const orderCode = localStorage.getItem('orderCode');
      if(orderCode){
        const orderId = localStorage.getItem('orderId');
        this.cartService.getBasketData(+orderId, orderCode)
        .subscribe(res => {
          if(res.success){
            this.basketCount = res.returnValue.totalQuantity;
          }
        },
        (error) => {
          console.log(error);
        });
      }
  }

  login(){
    this.router.navigateByUrl("login");
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("pinVerify");
    this.router.navigateByUrl("login");
  }

  showCart(){
    const orderCode = localStorage.getItem('orderCode');
    if(orderCode){
      const orderId = localStorage.getItem('orderId');
      const redirectUri =  '/summary/' + orderId + '/' + orderCode;
      const redirectModel : RedirectModel = {
        buttonText: "Proceed to checkout",
        redirectUri: redirectUri,
        message: 'Please login first in order to access your shopping cart.'
      }
      this.router.navigateByUrl(redirectUri);
    }
  }

  ngAfterContentChecked() {
    this.basketCount = this.sharedCartService.basketCount;
  }
}
