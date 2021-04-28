import { Component } from '@angular/core';
import { AppConfig } from './config/app-config';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fresh Meat';
  opened: boolean = false;
  constructor(private config : AppConfig, public authService: AuthService, private router: Router){  

  }

  toggleNav(){
    this.opened = !this.opened;
  }
  closeSideMenu(){
    this.opened = false;
  }

  login(){
    this.opened = false;
    this.router.navigateByUrl("login");
  }

  logout(){
    this.opened = false;
    localStorage.removeItem("token");
    localStorage.removeItem("pinVerify");
    this.router.navigateByUrl("login");
  }
  about(){
    this.opened = false;
    this.router.navigateByUrl("about");
  }
}
