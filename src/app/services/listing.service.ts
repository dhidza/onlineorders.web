import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { ICategoryModel } from '../interfaces/icategory-model';
import { Observable } from 'rxjs';
import { CrudResponse } from '../models/crud-response';
import { ICompanyProductModel } from '../interfaces/icompany-product-model';
import { ICountyModel } from '../interfaces/icounty-model';
import { IContactModel } from '../interfaces/icontact-model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private _http: HttpClient, private config: AppConfig) { }

  getCategories() :  Observable<CrudResponse<ICategoryModel[]>>{   
    return this._http.get<CrudResponse<ICategoryModel[]>>(this.config.dataEndpoint + "/listings/categories", 
              {headers: this.setHeaders()});
  }

  getCounties() :  Observable<CrudResponse<ICountyModel[]>>{   
    return this._http.get<CrudResponse<ICountyModel[]>>(this.config.dataEndpoint + "/listings/counties/", 
              {headers: this.setHeaders()});
  }

  getProducts(companyId: number, productId : number):  Observable<CrudResponse<ICompanyProductModel[]>>{  
    return this._http.get<CrudResponse<ICompanyProductModel[]>>(this.config.dataEndpoint + "/listings/products/" + 
              companyId + "/" + productId, 
       {headers: this.setHeaders()});
  }

  getTopSellers():  Observable<CrudResponse<ICompanyProductModel[]>>{  
    return this._http.get<CrudResponse<ICompanyProductModel[]>>(this.config.dataEndpoint + "/listings/topsellers", 
       {headers: this.setHeaders()});
  }

  contactUs(model: IContactModel): Observable<any>{  
    return this._http.post<any>(this.config.dataEndpoint + "/listings/contact",model, 
       {headers: this.setHeaders()});
  }

  private setHeaders() : HttpHeaders{
    const headers = new HttpHeaders()
      .set('AppName', this.config.appName);
   return headers;
  }
}
