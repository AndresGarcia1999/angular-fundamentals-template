import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { Author } from "@app/shared/models/author.model";

import { mockedAuthorsList } from "@app/shared/mocks/mock";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseComponent implements OnInit {
  courseForm!: FormGroup;
  availableAuthors: Author[] = mockedAuthorsList;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([], Validators.required), // Course authors
      duration: ["", [Validators.required, Validators.min(0)]],
    });
  }

  // Getters for form controls
  get title() {
    return this.courseForm.get("title");
  }
  get description() {
    return this.courseForm.get("description");
  }
  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get courseAuthors(): Author[] {
    return this.authors.controls.map((control) => {
      return this.availableAuthors.find(
        (author) => author.id === control.value
      )!;
    });
  }
  get duration() {
    return this.courseForm.get("duration");
  }

  // Get available authors (not in course)
  get availableAuthorsList() {
    const courseAuthorIds = this.authors.value; // Array of string IDs
    return this.availableAuthors.filter(
      (author) => !courseAuthorIds.includes(author.id)
    );
  }

  // Add existing author to course
  addAuthorToCourse(id: string) {
    this.authors.push(this.fb.control(id));
  }

  // Remove author from course
  removeAuthorFromCourse(id: string) {
    const index = this.authors.controls.findIndex(
      (control) => control.value === id
    );
    if (index !== -1) {
      this.authors.removeAt(index);
    }
  }

  // Handle new author creation from child component
  onAuthorCreated(newAuthor: Author) {
    this.availableAuthors.push(newAuthor);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log("Form Submitted", this.courseForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.courseForm.markAllAsTouched();
      console.log("Form is invalid");
    }
  }
}
