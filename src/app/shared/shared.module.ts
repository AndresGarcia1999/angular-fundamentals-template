import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModalComponent } from "./components/modal/modal.component";
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  AuthorFormComponent,
  CourseFormComponent,
  RegistrationFormComponent,
} from "./components";

import { DurationPipe, CustomDatePipe, AuthorNamesPipe } from "./pipes";
import { EmailValidatorDirective } from "@shared/directives/email.directive";

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  AuthorFormComponent,
  DurationPipe,
  CustomDatePipe,
  AuthorNamesPipe,
  EmailValidatorDirective,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [components],
})
export class SharedModule {}
