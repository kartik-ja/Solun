import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ISignInBenefits } from '../Inferfaces/ISignInBenefits';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.user$.subscribe((user) => {
      console.log('User:', user);
    });
  }

  login() {
    this.loginService.signInWithGoogle();
  }

  logout() {
    this.loginService.signOut();
  }
}
