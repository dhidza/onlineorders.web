import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatControlsModuleModule } from './mat-controls-module/mat-controls-module.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { ConfigService } from './config/config.service';
import { AppConfig } from './config/app-config';
import { VerifyPinComponent } from './verify-pin/verify-pin.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { DialogCartUpdateComponent } from './dialog-cart-update/dialog-cart-update.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { DialogDeliveryAddressComponent } from './dialog-delivery-address/dialog-delivery-address.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DeliveryComponent } from './delivery/delivery.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TopSellersComponent } from './top-sellers/top-sellers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';
import { CookieService } from 'ngx-cookie-service';
import { LegalComponent } from './legal/legal.component'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminComponent } from './admin/admin.component';
import { OrdersForDeliveryComponent } from './orders-for-delivery/orders-for-delivery.component';
import { AdminCompletedOrdersComponent } from './admin-completed-orders/admin-completed-orders.component';
import { AdminPrintOrdersComponent } from './admin-print-orders/admin-print-orders.component';

export function AppInit(configService: ConfigService){
  return () => {
    return configService.load();
  }
}


@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
    VerifyPinComponent,
    LoginComponent,
    SuccessComponent,
    CategoriesComponent,
    ProductsComponent,
    AddToCartComponent,
    DialogCartUpdateComponent,
    CheckoutComponent,
    CartSummaryComponent,
    DialogDeliveryAddressComponent,
    DeliveryComponent,
    FooterComponent,
    HomeComponent,
    NavLinksComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TestimonialsComponent,
    TopSellersComponent,
    AboutUsComponent,
    CookieConsentComponent,
    LegalComponent,
    OrderHistoryComponent,
    AdminComponent,
    OrdersForDeliveryComponent,
    AdminCompletedOrdersComponent,
    AdminPrintOrdersComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatControlsModuleModule,   
    NgxSpinnerModule,
    SlickCarouselModule,
    PdfViewerModule,
    NgxStripeModule.forRoot()
  ], 
  providers: [
    CookieService,
    {
      provide: AppConfig,
      deps:[HttpClient],
      useExisting: ConfigService,
     
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInit,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
