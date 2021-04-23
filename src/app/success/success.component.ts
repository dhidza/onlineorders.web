import { Component, OnInit } from '@angular/core';
import { RedirectModel } from '../models/redirect-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  redirectModel : RedirectModel;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    const strRedirectModel = sessionStorage.getItem('redirectModel');
    if (!strRedirectModel) {
      this.redirectModel = {
        message : 'Nothing to display',
        buttonText : 'Home',
        redirectUri : '/login' 
      }
    }
    else {
      this.redirectModel = JSON.parse(strRedirectModel);
    }    
  }

  processAction(){
    sessionStorage.removeItem('redirectModel');
    this.router.navigateByUrl(this.redirectModel.redirectUri);
  }
}
