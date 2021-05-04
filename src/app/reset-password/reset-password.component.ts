import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm : FormGroup;  
  serverError: boolean = false;
  serverErrorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService,  
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {  
      this.resetForm = this.formBuilder.group({
        username :  [params.get('email') , [Validators.required]],
        passwordToken : [params.get('token') , Validators.required],    
        newPassword: ['', [Validators.required, Validators.minLength(6)]],  
        confirmNewPassword: ['', Validators.required]
      }, {
        validator: this.mustMatch('newPassword', 'confirmNewPassword') 
      });
    }); 
  }

  onSubmit(){
    if(this.resetForm.valid)
    {
      this.authService.resetPassword(this.resetForm.value)
      .subscribe(res => {
          if(!res.success){
            this.serverError = true;
            this.serverErrorMessage = res.message;
            return;
          }
          const redirectModel = {
            message : 'You have successfully reset your password.  Please login using your new password',
            buttonText : 'Login',
            redirectUri : '/login' 
          }
          sessionStorage.setItem('redirectModel', JSON.stringify(redirectModel));
          this.router.navigateByUrl('/success');
      },
      (error) => {
        this.serverError = true;
        this.serverErrorMessage = error.error.message;
      }).unsubscribe();
    }
  }

  get f() { return this.resetForm.controls; }

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
