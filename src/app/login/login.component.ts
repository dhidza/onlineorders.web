import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RedirectModel } from '../models/redirect-model';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value)
        .subscribe(res => {
          console.log(res);            
          localStorage.setItem("token", res.token);
          const strRedirectModel = sessionStorage.getItem('redirectModel');
          if (!strRedirectModel) 
            this.router.navigateByUrl('/categories');
          
          const redirectModel : RedirectModel = JSON.parse(strRedirectModel);
          sessionStorage.removeItem('redirectModel');
          this.router.navigateByUrl(redirectModel.redirectUri);
        },
        (error) => {
          console.log(error);
        });
    }
  }
 
}
