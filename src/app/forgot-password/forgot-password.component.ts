import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = new FormGroup({
    username : new FormControl('',[Validators.required, Validators.email]),  
  });
  serverErrorMessage: string = '';
  serverError : boolean= false;
  constructor(private authService: AuthService, private router: Router,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.forgotPasswordForm.valid)
    {
      this.spinner.show();
      this.authService.requestReset(this.forgotPasswordForm.value)
      .subscribe(res => {        
          const redirectModel = {
            message : 'Check your email for the password reset instructions, these have been sent if your email is registered on our system.',
            buttonText : 'Home',
            redirectUri : '/categories' 
          }
          sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));   
          this.spinner.hide();     
          this.router.navigateByUrl('/success');
      },
      (error) => {
        const redirectModel = {
          message : 'Check your email for the password reset instructions, these have been sent if your email is registered on our system.',
          buttonText : 'Home',
          redirectUri : '/categories' 
          
        }
        sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));  
        this.spinner.hide();     
        this.router.navigateByUrl('/success');
      });
    }
  }
}
