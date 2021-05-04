import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RedirectModel } from '../models/redirect-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
  });
  serverErrorMessage: string = '';
  serverError : boolean= false;


  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid)
    {
      this.spinner.show();
      this.authService.login(this.loginForm.value)
        .subscribe(res => {
          this.spinner.hide();
          if(!res.success){
            switch(res.statusCode){
              //you have logged in but not veried account
              case 206:
                localStorage.setItem("pinVerify", JSON.stringify(res));
                this.router.navigateByUrl('/verify');
                break;
                //too many verification attempts, wait 5 minutes
              case 204:
                this.serverError = true;
                this.serverErrorMessage = res.message;
                return;
            }
            return;
          }          
          localStorage.setItem("token", res.token);
          const strRedirectModel = sessionStorage.getItem('redirectModel');
          if (!strRedirectModel) 
            this.router.navigateByUrl('/categories');
          else{
            const redirectModel : RedirectModel = JSON.parse(strRedirectModel);
            sessionStorage.removeItem('redirectModel');
            this.router.navigateByUrl(redirectModel.redirectUri);
          }
        },
        (error) => {
          this.serverError = true;
          this.serverErrorMessage = error.error.message;
          this.spinner.hide();
        }).unsubscribe();
       
    }
  } 
}
