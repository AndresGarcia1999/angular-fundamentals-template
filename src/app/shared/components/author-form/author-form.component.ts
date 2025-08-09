import { Subject, takeUntil } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, Output, OnDestroy } from "@angular/core";

import { Author } from "@app/shared/models";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-author-form",
  templateUrl: "./author-form.component.html",
  styleUrls: ["./author-form.component.scss"],
})
export class AuthorFormComponent implements OnDestroy {
  @Output() authorCreated = new EventEmitter<Author>();

  private destroy$ = new Subject<void>();
  authorForm: FormGroup;
  isLoadingAuthors$ = this.coursesStoreService.isLoadingAuthors$;

  constructor(
    private fb: FormBuilder,
    private coursesStoreService: CoursesStoreService
  ) {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createAuthor() {
    const authorName = this.authorName?.value?.trim();

    if (
      authorName &&
      this.authorName?.valid &&
      !this.coursesStoreService.isLoadingAuthors
    ) {
      this.coursesStoreService
        .createAuthor(authorName)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (newAuthor) => {
            console.log("Author created successfully:", newAuthor);

            // Emit the new author to parent component
            this.authorCreated.emit(newAuthor);

            // Clear the form
            this.authorName?.setValue("");
            this.authorName?.markAsUntouched();
          },
          error: (error) => {
            console.error("Error creating author:", error);
          },
        });
    }
  }
}
