import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { Observable } from 'rxjs';
import { CrudResponse } from '../models/crud-response';
import { IOrderProduct } from '../interfaces/iorder-product';
import { IOrder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private _http: HttpClient, private config: AppConfig) { }

  getOrderProduct(productId : number):  Observable<CrudResponse<IOrderProduct>>{  
    let orderId : number = -1;
    const strOrderId = localStorage.getItem('orderId');
    if(strOrderId)
      orderId = parseInt(strOrderId);

    return this._http.get<CrudResponse<IOrderProduct>>(this.config.dataEndpoint + "/shoppingcart/" 
             + productId + "/" + orderId, 
      {headers: this.setHeaders()});
  }

  addProductToOrder(product: IOrderProduct): Observable<CrudResponse<IOrder>> {
    return this._http.post<CrudResponse<IOrder>>(this.config.dataEndpoint + "/shoppingcart", 
              product, {headers: this.setHeaders()});
  }
  
  updateOrderProduct(orderCode: string, orderProductId: number, quantity:number): Observable<CrudResponse<IOrder>> {
    const data = {
      orderCode: orderCode,
      quantity: quantity,
      orderProductId: orderProductId
    };
    return this._http.patch<CrudResponse<IOrder>>(this.config.dataEndpoint + "/shoppingcart", 
              data, {headers: this.setHeaders()});
  }

  getShoppingCart(orderId: number, orderCode: string): Observable<CrudResponse<IOrder>> {
    return this._http.get<CrudResponse<IOrder>>(this.config.dataEndpoint + "/shoppingcart/summary/" 
              + orderId + "/" + orderCode, {headers: this.setHeaders()});
  }

  getBasketData(orderId: number, orderCode: string): Observable<CrudResponse<IOrder>> {
    return this._http.get<CrudResponse<IOrder>>(this.config.dataEndpoint + "/shoppingcart/basket/" 
              + orderId + "/" + orderCode, {headers: this.setHeaders()});
  }


  deleteOrderProduct(orderCode: string, orderProductId: number): Observable<CrudResponse<IOrder>> {
    return this._http.delete<CrudResponse<IOrder>>(this.config.dataEndpoint + "/shoppingcart/" 
              + orderCode + "/" + orderProductId, {headers: this.setHeaders()});
  }

  private setHeaders() : HttpHeaders{
    const headers = new HttpHeaders()
      .set('AppName', this.config.appName);
   return headers;
  }
}
