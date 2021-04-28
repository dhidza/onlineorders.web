import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IRegisterModel } from '../interfaces/iregister-model';
import { AppConfig } from '../config/app-config';
import {Observable} from 'rxjs';
import { IRegistrationResponseModel } from '../interfaces/iregistration-response-model';
import { IVerifyPinModel } from '../interfaces/iverify-pin-model';
import { IVerifyPinResponseModel } from '../interfaces/iverify-pin-response-model';
import { ILoginModel } from '../interfaces/ilogin-model';
import { ILoginResponse } from '../interfaces/ilogin-response';
import * as jwt_decode from "jwt-decode";
import { IUserProfile } from '../interfaces/iuser-profile';
import { IRequestReset } from '../interfaces/irequest-reset';
import { IRequestResetResponse } from '../interfaces/irequest-reset-response';
import { IResetRequest } from '../interfaces/ireset-request';
import { IResetResponse } from '../interfaces/ireset-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers : HttpHeaders = new HttpHeaders();
  
  constructor(private _http: HttpClient, private config: AppConfig ) {
    this.setHeaders();
   }
   
  login(model : ILoginModel) : Observable<ILoginResponse>{
    model.scope = 1;
    return this._http.post<ILoginResponse>(this.config.authEndpoint + "/account/login", model, 
              {headers: this.setHeaders()});
  }

  register(model : IRegisterModel) : Observable<IRegistrationResponseModel>{
    model.countryId = this.config.countryId;
    model.phoneNumber = this.config.phoneCode +  model.phone.substring(1);
    return this._http.post<IRegistrationResponseModel>(this.config.authEndpoint + "/account/register", model, 
              {headers: this.setHeaders()});
  }

  createUserProfile(model: IRegisterModel, userId: string) : Observable<IUserProfile> {
    model.countryId = this.config.countryId;
    model.phoneNumber = model.phone.substring(1);
    model.membershipId = userId;
    model.fullname = model.emailAddress;
    model.dateOfBirth = '1970-01-01';
    return this._http.post<IUserProfile>(this.config.dataEndpoint + "/profile", model, 
    {headers: this.setHeaders()});
  }

  verifyAccount(model : IVerifyPinModel): Observable<IVerifyPinResponseModel>{
    const registrationResponse : IRegistrationResponseModel = JSON.parse(localStorage.getItem("pinVerify")); 
    model.countryId = this.config.countryId;
    model.membershipId = registrationResponse.userId;
    model.phoneNumber = registrationResponse.phone;
    model.email = registrationResponse.email;
    return this._http.post<IVerifyPinResponseModel>(this.config.authEndpoint + "/account/verifypin", model, 
    {headers: this.setHeaders()});
  }

  completeProfile(){

  }

  updateProfile(){

  }

  requestReset(model: IRequestReset): Observable<IRequestResetResponse> {
    return this._http.post<IRequestResetResponse>(this.config.authEndpoint + "/account/requestreset", model, 
    {headers: this.setHeaders()});
  }

  resetPassword(model: IResetRequest): Observable<IResetResponse> {
    return this._http.post<IResetResponse>(this.config.authEndpoint + "/account/reset", model, 
    {headers: this.setHeaders()});
  }

  isLoggedIn(){
    const token =  localStorage.getItem("token");  
    if(token){
      const decoded = jwt_decode(token);     
      if (Date.now() >= decoded.exp * 1000) {
        return false;
      }
      else
        return true;
    }
    return false;
  }
  private setHeaders() : HttpHeaders{
    const headers = new HttpHeaders()
      .set('AppName', this.config.appName);
   return headers;
  }
}
