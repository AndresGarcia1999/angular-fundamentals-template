import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Subject,
  switchMap,
  takeUntil,
  BehaviorSubject,
  distinctUntilChanged,
} from "rxjs";

import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "../../services/courses-store.service";
import { UserStoreService } from "../../user/services/user-store.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject$ = new BehaviorSubject<string>("");

  courses$ = this.coursesStoreService.courses$;
  isLoading$ = this.coursesStoreService.isLoading$;
  authors$ = this.coursesStoreService.authors$;
  isAdmin$ = this.userStoreService.isAdmin$;

  constructor(
    private coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadAllCourses(); // Load all courses initially
    this.loadAuthors(); // Load authors for pipe
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchSubject$
      .pipe(
        distinctUntilChanged(), // Only emit if the search term actually changed
        switchMap((term) =>
          this.coursesStoreService.filterCourses(term.trim())
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (courses) => {
          console.log("Search results:", courses);
        },
        error: (error) => {
          console.error("Error searching courses:", error);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAllCourses(): void {
    this.coursesStoreService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          console.log("Courses loaded successfully", courses);
        },
        error: (error) => {
          console.error("Error loading courses:", error);
        },
      });
  }

  private loadAuthors(): void {
    this.coursesStoreService
      .getAllAuthors()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (authors) => {
          console.log("Authors loaded successfully", authors);
        },
        error: (error) => {
          console.error("Error loading authors:", error);
        },
      });
  }

  private loadUserData(): void {
    this.userStoreService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          console.log("User data loaded:", user);
        },
        error: (error) => {
          console.error("Error loading user data:", error);
        },
      });
  }

  /**
   * Handle search functionality - triggers backend search
   * The service will update courses$ observable with filtered results
   */
  onSearch(term: string): void {
    this.searchSubject$.next(term);
  }

  onEditCourse(course: Course): void {
    this.router.navigate(["/courses/edit", course.id]);
  }

  onDeleteCourse(course: Course): void {
    this.coursesStoreService
      .deleteCourse(course.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log("Course deleted successfully:", course.title);
        },
        error: (error) => {
          console.error("Error deleting course:", error);
        },
      });
  }

  onShowCourse(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  onAddNewCourse(): void {
    this.router.navigate(["/courses/add"]);
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  get searchTerm(): string {
    return this.searchSubject$.getValue();
  }
}
