import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../services/auth.service'; 
import { Router } from '@angular/router';
import { ICountyModel } from '../interfaces/icounty-model';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit { 
  registrationForm = new FormGroup({
    emailAddress : new FormControl('',[Validators.required, Validators.email]),
    phone : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    eirCode : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    countyId: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  counties : ICountyModel[];
  
  constructor(private authService: AuthService,  private listingService: ListingService, private router: Router) {
  }

  ngOnInit(): void {
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
        this.authService.register(this.registrationForm.value)
          .subscribe(res =>{
            console.log(res);           
            this.authService.createUserProfile(this.registrationForm.value, res.userId)
            .subscribe(res2 => {
              localStorage.setItem("pinVerify", JSON.stringify(res));
              if(res.smsSent)
                this.router.navigateByUrl('/verify');
              else
                this.router.navigateByUrl('/requestverification');
            });
          },
          (error) => {
            console.log(error);
          });
    }
  }
}