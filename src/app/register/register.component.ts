import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../services/auth.service'; 
import { Router } from '@angular/router';
import { ICountyModel } from '../interfaces/icounty-model';
import { ListingService } from '../services/listing.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit { 
  registrationForm : FormGroup;  
  counties : ICountyModel[];
  serverError: boolean = false;
  serverErrorMessage: string = "";
  constructor(private formBuilder: FormBuilder, private authService: AuthService,  
    private listingService: ListingService, private router: Router,  private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      emailAddress :  ['',[Validators.required, Validators.email]],
      phone : ['', Validators.required],
      address : ['', Validators.required],
      eirCode : ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      countyId: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword') 
    });

    this.listingService.getCounties()
    .subscribe(res => {
      console.log(res);
      this.counties = res.returnValue;
    },
    (error) => {
      console.log(error);
    });        
  }

  onSubmit(){
    if(this.registrationForm.valid)
    {
      this.spinner.show();
      this.authService.register(this.registrationForm.value)
        .subscribe(res =>{           
          if(!res.success)  {
            this.serverError = true;
            this.serverErrorMessage = res.message;
            this.spinner.hide();
            return;
          }         
          this.authService.createUserProfile(this.registrationForm.value, res.userId)
          .subscribe(res2 => {
            this.spinner.hide();
            localStorage.setItem("pinVerify", JSON.stringify(res));
            if(res.smsSent)
              this.router.navigateByUrl('/verify');
            else
              this.router.navigateByUrl('/requestverification');
          });
        },
        (error) => {
          this.serverError = true;
          this.serverErrorMessage = error.error.message;      
          this.spinner.hide();     
        });
    }
  }

  get f() { return this.registrationForm.controls; }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}


