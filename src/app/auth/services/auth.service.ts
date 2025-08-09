import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { UserStoreService } from "@app/user/services/user-store.service";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  successful: boolean;
  result: string; // JWT token
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = "http://localhost:4000";
  // Private BehaviorSubject for internal state management
  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // Public Observable for components to subscribe to
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {
    // Check if user is already logged in on service initialization
    this.checkAuthStatus();
  }

  /**
   * Check authentication status on service initialization
   */
  private checkAuthStatus(): void {
    const token = this.sessionStorageService.getToken();
    this.isAuthorized$$.next(!!token);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap({
          next: (response) => {
            if (response.successful && response.result) {
              this.sessionStorageService.setToken(response.result);
              this.isAuthorized$$.next(true);

              // Load user data after successful login
              this.userStoreService.getUser().subscribe();
            }
          },
        })
      );
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.API_URL}/logout`).pipe(
      tap({
        next: () => {
          this.sessionStorageService.deleteToken();
          this.isAuthorized$$.next(false);
          // Navigate to login page after logout
          this.router.navigate(["/login"]);
          // Clear user data on logout
          this.userStoreService.clearUser();
        },
        error: (error) => {
          console.error("Logout error:", error);
          this.sessionStorageService.deleteToken();
          this.isAuthorized$$.next(false);
          // Navigate to login page after logout
          this.router.navigate(["/login"]);
          // Clear user data on logout
          this.userStoreService.clearUser();
        },
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, userData)
      .pipe(
        tap({
          next: (response) => {
            if (response.successful && response.result) {
              this.sessionStorageService.setToken(response.result);
              this.isAuthorized$$.next(true);
            }
          },
        })
      );
  }

  getToken(): string | null {
    return this.sessionStorageService.getToken();
  }

  get isAuthorized() {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }
}
