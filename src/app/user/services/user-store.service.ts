import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, finalize, tap, map } from "rxjs";

import { UserService, User } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  // Private BehaviorSubjects for internal state management
  private name$$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // Public Observables for external access (read-only)
  public name$: Observable<string> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private userService: UserService) {}

  /**
   * Get user information and update the store
   */
  getUser(): Observable<User> {
    this.isLoading$$.next(true);

    return this.userService.getUser().pipe(
      tap((response) => {
        if (response.successful) {
          // Update user name
          this.name$$.next(response.result.name);

          // Update admin status based on role
          const isAdmin = response.result.role === "admin";
          this.isAdmin$$.next(isAdmin);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Check if current user is admin (synchronous access)
   */
  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  /**
   * Get current user name (synchronous access)
   */
  get name(): string {
    return this.name$$.value;
  }

  /**
   * Get current loading state (synchronous access)
   */
  get isLoading(): boolean {
    return this.isLoading$$.value;
  }

  /**
   * Clear user data (for logout)
   */
  clearUser(): void {
    this.name$$.next("");
    this.isAdmin$$.next(false);
  }
}
