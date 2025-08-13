// Angular HTTP Interceptor for automatic JWT refresh

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router,private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({
      withCredentials: true
    });
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401  && !req.url.includes('/refresh') && !req.url.includes('/google')) {
          // Attempt refresh
          return this.http.post('/api/auth/refresh', {}, { withCredentials: true }).pipe(
            switchMap(() => {
              // Retry original request with credentials
              const retryReq = req.clone({ withCredentials: true });
              return next.handle(retryReq);
            }),
            catchError(refreshError => {
              const returnUrl = this.router.url;
              // this.router.navigate(['/login']);
              this.router.navigate(['/login'], { queryParams: { returnUrl } });
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
