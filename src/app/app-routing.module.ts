import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component' 
import { VerifyPinComponent } from './verify-pin/verify-pin.component';
import { SuccessComponent } from './success/success.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { DeliveryComponent } from './delivery/delivery.component';  
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LegalComponent } from './legal/legal.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminComponent } from './admin/admin.component';
import { OrdersForDeliveryComponent } from './orders-for-delivery/orders-for-delivery.component';
import { AdminCompletedOrdersComponent } from './admin-completed-orders/admin-completed-orders.component';
import { AdminPrintOrdersComponent } from './admin-print-orders/admin-print-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyPinComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'requestreset', component: ForgotPasswordComponent },
  { path: 'reset/:token/:email', component: ResetPasswordComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'products/:id', component: ProductsComponent},
  { path: 'cart/:id', component: AddToCartComponent},
  { path: 'summary/:id/:code', component: CartSummaryComponent, canActivate:[AuthGuardService]},
  { path: 'orders', component: OrderHistoryComponent, canActivate:[AuthGuardService]},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuardService]},
  { path: 'admin/deliveryorders', component: OrdersForDeliveryComponent, canActivate:[AuthGuardService]},
  { path: 'admin/completedorders', component: AdminCompletedOrdersComponent, canActivate:[AuthGuardService]},
  { path: 'admin/print', component: AdminPrintOrdersComponent, canActivate:[AuthGuardService]},
  { path: 'delivery/:id/:code', component: DeliveryComponent, canActivate:[AuthGuardService]},
  { path: 'checkout/:id/:code', component: CheckoutComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
