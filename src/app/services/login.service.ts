import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,catchError  } from 'rxjs/operators';
import { IUser } from '../Inferfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<SocialUser | null>(null);
  private serverUserSubject = new BehaviorSubject<IUser | null>(null);
  public googleUser$: Observable<SocialUser | null> = this.userSubject.asObservable();
  public serverUser$: Observable<IUser | null> = this.serverUserSubject.asObservable();
  // getProducts() : Observable<IProduct[]>
  // {
  //   return this.client.get<IProduct[]>("/api/watches", {withCredentials: true});
  // }
  constructor(private authService: SocialAuthService, private client: HttpClient) {
    this.authService.authState.subscribe((user) => {
      const idToken = user.idToken;
      this.client.post<IUser>('api/Auth/google', { idToken }, {withCredentials: true}).subscribe
        (
          (serverUser) => {
            this.userSubject.next(user);
            this.serverUserSubject.next(serverUser);
            // console.log(serverUser);
          },
          (error) => {
            console.log(error)
          }
        )
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      
    });;
  }
  signOut(): void {
    this.authService.signOut();
  }
  getUser(): SocialUser | null {
    return this.userSubject.value;
  }
}