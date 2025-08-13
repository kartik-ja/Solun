import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ISignInBenefits } from '../Inferfaces/ISignInBenefits';
import { ActivatedRoute,Router } from '@angular/router';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInBenefits: ISignInBenefits[] =[
    {
      title: "Cart",
      description: "Save your cart to your account. Sign in with any device and see continue shopping."
    },
    {
      title: "Orders",
      description: "Keep track of your orders. See your order history so you don't have find your order in your email."
    },
    {
      title: "Convenience",
      description: "Save your shipping address for hassle free checkout."
    },
  ];
  returnUrl:string = "/";
  constructor(private loginService: LoginService, private route:ActivatedRoute, private router :Router) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginService.googleUser$.subscribe((user) => {
      if (user != null)
      {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
    this.loginService.serverUser$.subscribe((user) => {
      if (user != null)
      {
        
      }
    });
  }

  login() {
    this.loginService.signInWithGoogle();
  }

  logout() {
    this.loginService.signOut();
  }
}
