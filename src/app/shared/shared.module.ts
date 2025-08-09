import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ModalComponent } from "@shared/components/modal/modal.component";
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  AuthorFormComponent,
  CourseComponent,
  SpinnerComponent,
} from "@shared/components";

import { DurationPipe, CustomDatePipe, AuthorNamesPipe } from "@shared/pipes";
import { EmailValidatorDirective } from "@shared/directives/email.directive";

const components = [
  SpinnerComponent,
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  CourseComponent,
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
