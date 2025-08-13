import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component'
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authgaurd';
import { ProductPageComponent } from './product-page/product-page.component';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Solun" },
  { path: 'Products', component: ProductsComponent, title: "Solun - Everyday Collection" },
  { path: 'Cart', component: CartComponent, title: "Solun - Cart" },
  { path: 'Profile', component: ProfileComponent, title: "Solun - Profile" },
  // { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard], title: "Solun - Profile" },
  { path: 'login', component: LoginComponent },
  { path: 'Product', component: ProductPageComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'checkout', component: CheckoutComponent },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports :[
    RouterModule
  ]
})
export class AppRoutingModule { }
