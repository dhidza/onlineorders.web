import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRegistrationResponseModel } from '../interfaces/iregistration-response-model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RedirectModel } from '../models/redirect-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {
  registrationResponse : IRegistrationResponseModel;
  verifyPinForm : FormGroup; 
  verifyFailed: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService,  private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
     let strAuthResponse : string =  localStorage.getItem("pinVerify");
     if(strAuthResponse)
        this.registrationResponse = JSON.parse(strAuthResponse); 

      this.verifyPinForm = new FormGroup({
        code : new FormControl('',[Validators.required]),
        phone : new FormControl(this.registrationResponse.phone)
      });
  }

  onSubmit(){
    if(this.verifyPinForm.valid)
    {
        this.spinner.show();
        this.authService.verifyAccount(this.verifyPinForm.value)
          .subscribe(res =>{
            this.spinner.hide();
            console.log(res); 
            if(res.success){
              let strRedirectModel : string = sessionStorage.getItem("redirectModel");
              if(!strRedirectModel){
                const redirectModel : RedirectModel = {
                  redirectUri: "/login",
                  buttonText: "Login",
                  message: res.message
                }
                sessionStorage.setItem("redirectModel", JSON.stringify(redirectModel));
              }
              this.router.navigateByUrl('/success');     
            }
            else{
              this.verifyFailed = true;
              this.errorMessage = res.message;
            }
            
          },
          (response) => {
            console.log(response);
            this.verifyFailed = true;
            this.errorMessage = response.error.message;
            this.spinner.hide();
          });
    }
  }
}
