import { Component } from '@angular/core';
import { AppConfig } from './config/app-config';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { RedirectModel } from './models/redirect-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnlineOrders';
  opened: boolean = false;
  constructor(private config : AppConfig, public authService: AuthService, private router: Router){  

  }

  toggleNav(){
    this.opened = !this.opened;
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
  login(){
    this.router.navigateByUrl("login");
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("pinVerify");
    this.router.navigateByUrl("login");
  }
}
