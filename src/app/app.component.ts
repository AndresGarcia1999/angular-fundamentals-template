import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  isAuthenticated: boolean = this.authService.isAuthorized;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthorized$;
  }
  get userName$(): Observable<string> {
    return this.userStoreService.name$;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
      },
    });
  }
}
