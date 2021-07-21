import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { Observable } from 'rxjs';
import { CrudResponse } from '../models/crud-response';
import { IOrder } from '../interfaces/iorder';
import { ICompleteOrderResponse } from '../interfaces/icomplete-order-response';
import { IDeliveryDetails } from '../interfaces/idelivery-details';
import { IStripeChargeResponse } from '../interfaces/istripe-charge-response';
import { IStripeChargeRequest } from '../interfaces/istripe-charge-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient, private config: AppConfig) { }

  updateDeliveryAddress(orderCode: string, deliveryDetails: IDeliveryDetails): Observable<CrudResponse<IOrder>> {
    deliveryDetails.orderCode = orderCode;
    return this._http.put<CrudResponse<IOrder>>(this.config.dataEndpoint + "/order" 
               , deliveryDetails, {headers: this.setHeaders()});
  }

  customerCompleteOrder(orderCode: string): Observable<CrudResponse<ICompleteOrderResponse>> {
    return this._http.patch<CrudResponse<ICompleteOrderResponse>>(this.config.dataEndpoint + "/order/" 
              + orderCode , {headers: this.setHeaders()});
  }

  chargeOrder(model: IStripeChargeRequest): Observable<CrudResponse<IStripeChargeResponse>> {
    return this._http.post<CrudResponse<IStripeChargeResponse>>(this.config.dataEndpoint + "/payment/charge" , model, {headers: this.setHeaders()});
  }

  initiateOrder(orderCode: string, cardHolder: string): Observable<CrudResponse<IStripeChargeResponse>> {
    return this._http.get<CrudResponse<IStripeChargeResponse>>(this.config.dataEndpoint + "/payment/initiate/" + orderCode + "/" + cardHolder , 
     {headers: this.setHeaders()});
  }

  customerOrders(): Observable<CrudResponse<IOrder[]>> {
    return this._http.get<CrudResponse<IOrder[]>>(this.config.dataEndpoint + "/order/all",  {headers: this.setHeaders()});
  }

  adminOrders(): Observable<CrudResponse<IOrder[]>> {
    return this._http.get<CrudResponse<IOrder[]>>(this.config.dataEndpoint + "/order/company",  {headers: this.setHeaders()});
  }

  ordersForDelivery(): Observable<CrudResponse<IOrder[]>> {
    return this._http.get<CrudResponse<IOrder[]>>(this.config.dataEndpoint + "/order/delivery",  {headers: this.setHeaders()});
  }

  informDeliveryEnroute(orderCode: string): Observable<CrudResponse<ICompleteOrderResponse>> {
    return this._http.get<CrudResponse<ICompleteOrderResponse>>(this.config.dataEndpoint + "/delivery/pickup/" 
              + orderCode , {headers: this.setHeaders()});
  }

  markOrderAsDelivered(orderCode: string): Observable<CrudResponse<ICompleteOrderResponse>> {
    return this._http.get<CrudResponse<ICompleteOrderResponse>>(this.config.dataEndpoint + "/delivery/deliver/" 
              + orderCode , {headers: this.setHeaders()});
  }

  private setHeaders() : HttpHeaders{
    const headers = new HttpHeaders()
      .set('AppName', this.config.appName);
     
   return headers;
  }
}
