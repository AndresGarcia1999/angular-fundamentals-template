import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface UserResponse {
  successful: boolean;
  result: User;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  /**
   * Get current user information
   */
  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/users/me`);
  }
}
