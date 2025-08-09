import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, ViewChild } from "@angular/core";

import { AuthService, LoginRequest } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}
  isLoading = false;
  errorMessage = "";

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";

      const formData = this.loginForm.value;
      const loginRequest: LoginRequest = {
        email: formData.email,
        password: formData.password,
      };

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          if (response.successful) {
            // Navigate to courses page after successful login
            this.router.navigate(["/courses"]);
          } else {
            this.errorMessage = "Login failed. Please check your credentials.";
          }
        },
        error: (error) => {
          console.error("Login error:", error);
          this.errorMessage = "Login failed. Please try again later.";
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onRegisterClick() {
    // Navigate to the registration page
    this.router.navigate(["/registration"]);
  }
}
