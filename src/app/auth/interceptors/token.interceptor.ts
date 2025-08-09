import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError, catchError } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Define auth endpoints that should NOT trigger automatic logout on 401
  private authEndpoints = ["/login", "/register", "/logout"];

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from the auth service
    const token = this.authService.getToken();

    // Clone the request and add the Authorization header if token exists
    let authReq = req;
    if (token) {
      authReq = req.clone({
        headers: req.headers.set("Authorization", token),
      });
    }

    // Handle the request and catch 401 errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isAuthEndpoint(req.url)) {
          // Token is invalid or expired
          this.authService.logout().subscribe({
            next: () => {
              // Redirect to login page after logout
              this.router.navigate(["/login"]);
            },
            error: () => {
              // Even if logout fails, clear local state and redirect
              this.authService.isAuthorized = false;
              this.router.navigate(["/login"]);
            },
          });
        }
        return throwError(() => error);
      })
    );
  }

  private isAuthEndpoint(url: string): boolean {
    return this.authEndpoints.some((endpoint) => url.includes(endpoint));
  }
}
