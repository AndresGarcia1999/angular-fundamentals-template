import { Subject, takeUntil, forkJoin } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { Author } from "@app/shared/models/author.model";
import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  courseForm!: FormGroup;
  availableAuthors: Author[] = [];
  isEditMode = false;
  courseId: string | null = null;
  isLoading$ = this.coursesStoreService.isLoading$;
  isLoadingAuthors$ = this.coursesStoreService.isLoadingAuthors$;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.checkEditMode();
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([], Validators.required), // Course authors
      duration: ["", [Validators.required, Validators.min(0)]],
    });
  }

  private checkEditMode(): void {
    this.courseId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.courseId;
  }

  private loadInitialData(): void {
    if (this.isEditMode && this.courseId) {
      // Load both authors and course data for edit mode
      forkJoin({
        authors: this.coursesStoreService.getAllAuthors(),
        course: this.coursesStoreService.getCourse(this.courseId),
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: ({ authors, course }) => {
            this.availableAuthors = authors;
            this.populateForm(course);
          },
          error: (error) => {
            console.error("Error loading data:", error);
            this.navigateBack();
          },
        });
    } else {
      // Load only authors for add mode
      this.coursesStoreService
        .getAllAuthors()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (authors) => {
            this.availableAuthors = authors;
          },
          error: (error) => {
            console.error("Error loading authors:", error);
          },
        });
    }
  }

  private populateForm(course: Course): void {
    // Clear existing authors in form array
    this.authors.clear();

    // Populate basic fields
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
    });

    // Populate authors
    course.authors.forEach((authorId) => {
      this.authors.push(this.fb.control(authorId));
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
      const formData = this.courseForm.value;

      if (this.isEditMode && this.courseId) {
        this.updateCourse(formData);
      } else {
        this.createCourse(formData);
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.courseForm.markAllAsTouched();
      console.log("Form is invalid");
    }
  }

  private createCourse(formData: any): void {
    const createRequest = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      authors: formData.authors,
    };

    this.coursesStoreService
      .createCourse(createRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (course) => {
          console.log("Course created successfully:", course);
          this.navigateBack();
        },
        error: (error) => {
          console.error("Error creating course:", error);
        },
      });
  }

  private updateCourse(formData: any): void {
    if (!this.courseId) return;

    const editRequest = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      authors: formData.authors,
    };

    this.coursesStoreService
      .editCourse(this.courseId, editRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (course) => {
          console.log("Course updated successfully:", course);
          this.navigateBack();
        },
        error: (error) => {
          console.error("Error updating course:", error);
        },
      });
  }

  navigateBack(): void {
    this.router.navigate(["/courses"]);
  }

  get pageTitle(): string {
    return this.isEditMode ? "Edit Course" : "Create Course";
  }

  get submitButtonText(): string {
    return this.isEditMode ? "Update Course" : "Create Course";
  }
}
