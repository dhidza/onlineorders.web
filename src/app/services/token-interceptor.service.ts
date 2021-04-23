import { Injectable } from '@angular/core';
import {
  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor,HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress"); //SECTION 1
    const token: string = localStorage.getItem('token');
    if(token){
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                //401 UNAUTHORIZED - SECTION 2
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED")
                }
                const err = error.error.message || error.statusText;
                return throwError(error);                    
           })
        );
  }  
}
