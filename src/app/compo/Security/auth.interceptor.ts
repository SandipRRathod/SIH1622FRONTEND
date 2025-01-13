
//most useful for intire application

//The AuthInterceptor is an Angular HTTP interceptor that intercepts HTTP requests before they are sent to the backend. It checks if the request should include an authorization token based on whether the user is authenticated as an admin or a regular user. If a token is available, it adds the token to the request headers for authentication.

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
//The AuthInterceptor implements the HttpInterceptor interface, which requires the intercept method to be defined. This method will intercept HTTP requests.
  
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // aabstract method from HttpInterceptor interface
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



     const isAdminRequest = this.authService.isAuthenticatedSubjectAdmin.getValue(); 

    //  If the user is authenticated as an admin (isAdminRequest is true), the token for admin is fetched using this.authService.getTokenAdmin().

    const token = isAdminRequest ? this.authService.getTokenAdmin() : this.authService.getToken();


    if (token) {

      // iftoken exists

      //Set Authorization Header: The cloned request includes an Authorization header with the value Bearer ${token}, which is the standard format for sending JWT tokens.

      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(clonedRequest);  
    }

    return next.handle(req);  
  }


 
}

//summary in short
//Interception: The AuthInterceptor intercepts outgoing HTTP requests.
// Admin Check: It checks if the current user is an admin using isAuthenticatedSubjectAdmin.
// Token Fetch: Based on whether the user is an admin or not, it fetches the corresponding token.
// Token Attachment: If a token is available, it adds an Authorization header with the token to the request.
// Request Forwarding: The modified or unmodified request is then forwarded to the next handler or directly to the backend.



