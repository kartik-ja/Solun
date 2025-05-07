import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component'
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title: "Solun"},
  // {path: '/', redirectTo: '/home', pathMatch: 'full'},
  {path: 'Products', component: ProductsComponent, title: "Solun - Everyday Collection"},
  // {path: 'Everyday', component: ProductsComponent, title: "Solun - Everyday Collection"},
  // {path: 'Classics', component: ProductsComponent, title: "Solun - Classics Collection"},
  // {path: 'Elements', component: ProductsComponent, title: "Solun - Elements Collection"},
  {path: 'Cart', component: CartComponent, title: "Solun - Cart"},
  {path: 'Profile', component: ProfileComponent, title: "Solun - Profile"},
  // {path: '/', component: HomeComponent, title: "Solun - Elements Collection",pathMatch: 'prefix'}
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
