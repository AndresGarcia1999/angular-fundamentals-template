import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log("Form Submitted!", this.registrationForm.value);
      // Handle form submission logic here
    } else {
      console.error("Form is invalid");
    }
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
