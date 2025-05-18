import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from './app-bar/app-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
const clientId :string = "308344253765-jsdb5uh256jj0hnr4osel1j0sckmaead.apps.googleusercontent.com";
@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    HomeComponent,
    ProductsComponent,
    ProductCardComponent,
    CartComponent,
    ProfileComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(clientId)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
