import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
  Router,
  CanActivate,
} from "@angular/router";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    if (this.authService.isAuthorized) {
      return true;
    } else {
      return this.router.createUrlTree(["/login"]);
    }
  }
  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthorized) {
      return true;
    } else {
      return this.router.createUrlTree(["/login"]);
    }
  }
}
