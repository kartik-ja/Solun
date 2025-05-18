import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<SocialUser | null>(null);
  public user$: Observable<SocialUser | null> = this.userSubject.asObservable();

  constructor(private authService: SocialAuthService) {
    this.authService.authState.subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUser(): SocialUser | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}