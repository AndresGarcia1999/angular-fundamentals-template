import { Directive } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";

// Validator function for reactive forms
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(control.value);
    return isValid ? null : { emailValidator: { value: control.value } };
  };
}

// Directive for template-driven forms
@Directive({
  selector: "[emailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator()(control); // Reuse the function
  }
}
