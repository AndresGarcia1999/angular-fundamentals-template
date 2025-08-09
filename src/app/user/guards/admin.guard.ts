import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";

import { UserStoreService } from "@app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    // If user data is not loaded yet, fetch it first
    if (!this.userStoreService.name) {
      return this.userStoreService.getUser().pipe(
        map(() => {
          if (this.userStoreService.isAdmin) {
            return true;
          } else {
            return this.router.createUrlTree(["/courses"]);
          }
        })
      );
    }

    // If user data is already loaded, check admin status directly
    if (this.userStoreService.isAdmin) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
