import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "@app/auth/services/auth.service";

import { emailValidator } from "@app/shared/directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required, emailValidator()]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  isLoading = false;
  errorMessage = "";

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";
      const formData = this.registrationForm.value;
      const registrationRequest = {
        name: formData.name || "",
        email: formData.email || "",
        password: formData.password || "",
      };

      this.authService.register(registrationRequest).subscribe({
        next: (response) => {
          if (response.successful) {
            // Navigate to login page after successful registration
            this.router.navigate(["/login"]);
          } else {
            this.errorMessage = "Registration failed. Please try again.";
          }
        },
        error: (error) => {
          console.error("Registration error:", error);
          this.errorMessage = "Registration failed. Please try again later.";
        },
        complete: () => {
          this.isLoading = false;
        },
      });

      // Handle form submission logic here
    } else {
      console.error("Form is invalid");
    }
  }

  onLoginClick() {
    this.router.navigate(["/login"]);
  }

  //getters
  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
}
