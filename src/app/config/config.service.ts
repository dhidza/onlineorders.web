import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppConfig {
    
  constructor(private http: HttpClient) { 
    super();
  }

  load(){
    return this.http.get<AppConfig>('config.json')
    .toPromise()
    .then(data => {
      this.authEndpoint = data.authEndpoint;
      this.dataEndpoint = data.dataEndpoint;
      this.countryId = data.countryId;
      this.appName = data.appName;
      this.phoneCode = data.phoneCode;
      this.companyId = data.companyId;
      this.stripeKey = data.stripeKey;
    })
    .catch(() => {
      console.log('Could not load configuration for application');
    });
  }
}
