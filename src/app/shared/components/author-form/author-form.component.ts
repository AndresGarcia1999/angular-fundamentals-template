import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Author } from "@app/shared/models";

@Component({
  selector: "app-author-form",
  templateUrl: "./author-form.component.html",
  styleUrls: ["./author-form.component.scss"],
})
export class AuthorFormComponent {
  @Output() authorCreated = new EventEmitter<Author>();

  authorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.authorForm = this.fb.group({
      name: [
        "",
        [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
      ],
    });
  }

  get authorName() {
    return this.authorForm.get("name");
  }

  createAuthor() {
    const authorName = this.authorName?.value?.trim();

    if (authorName && this.authorName?.valid) {
      const newAuthor: Author = {
        id: crypto.randomUUID(),
        name: authorName,
      };

      // Emit the new author to parent component
      this.authorCreated.emit(newAuthor);

      // Clear the form
      this.authorName?.setValue("");
      this.authorName?.markAsUntouched();
    }
  }
}
