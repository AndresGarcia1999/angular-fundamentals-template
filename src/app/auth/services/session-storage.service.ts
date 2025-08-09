import { Inject, Injectable, InjectionToken } from "@angular/core";

const TOKEN = "SESSION_TOKEN";

const WINDOW = new InjectionToken<Window>("window", {
  providedIn: "root",
  factory: () => window,
});

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    sessionStorage.removeItem(TOKEN);
  }
}
