import { NgForm } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
    }
  }
}
