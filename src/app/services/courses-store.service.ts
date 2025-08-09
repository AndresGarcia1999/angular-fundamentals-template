import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, finalize, tap, map } from "rxjs";
import {
  Course,
  Author,
  CoursesService,
  EditCourseRequest,
  CreateCourseRequest,
} from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  // Private BehaviorSubjects for internal state management
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private isLoadingAuthors$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>(
    []
  );

  // Public Observables for external access (read-only)
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public isLoadingAuthors$: Observable<boolean> =
    this.isLoadingAuthors$$.asObservable();
  public courses$: Observable<Course[]> = this.courses$$.asObservable();
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  /**
   * Get all courses and update the store
   */
  getAll(): Observable<Course[]> {
    this.isLoading$$.next(true);

    return this.coursesService.getAll().pipe(
      tap((response) => {
        if (response.successful) {
          this.courses$$.next(response.result);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Create a new course and update the store
   */
  createCourse(course: CreateCourseRequest): Observable<Course> {
    this.isLoading$$.next(true);

    return this.coursesService.createCourse(course).pipe(
      tap((response) => {
        if (response.successful) {
          // Add new course to the existing courses array
          const currentCourses = this.courses$$.value;
          this.courses$$.next([...currentCourses, response.result]);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Get a specific course by ID
   */
  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true);

    return this.coursesService.getCourse(id).pipe(
      map((response) => response.result),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Edit an existing course and update the store
   */
  editCourse(id: string, course: EditCourseRequest): Observable<Course> {
    this.isLoading$$.next(true);

    return this.coursesService.editCourse(id, course).pipe(
      tap((response) => {
        if (response.successful) {
          // Update the course in the existing courses array
          const currentCourses = this.courses$$.value;
          const updatedCourses = currentCourses.map((c) =>
            c.id === id ? response.result : c
          );
          this.courses$$.next(updatedCourses);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Delete a course and update the store
   */
  deleteCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);

    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        // Remove the course from the existing courses array
        const currentCourses = this.courses$$.value;
        const filteredCourses = currentCourses.filter(
          (course) => course.id !== id
        );
        this.courses$$.next(filteredCourses);
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Filter courses by search term and update the store
   */
  filterCourses(value: string): Observable<Course[]> {
    this.isLoading$$.next(true);

    if (!value || value.trim() === "") {
      // If search is empty, get all courses
      return this.getAll();
    }

    return this.coursesService.filterCourses(value).pipe(
      tap((response) => {
        if (response.successful) {
          this.courses$$.next(response.result);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  /**
   * Get all authors and update the store
   */
  getAllAuthors(): Observable<Author[]> {
    this.isLoadingAuthors$$.next(true);

    return this.coursesService.getAllAuthors().pipe(
      tap((response) => {
        if (response.successful) {
          this.authors$$.next(response.result);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoadingAuthors$$.next(false))
    );
  }

  /**
   * Create a new author and update the store
   */
  createAuthor(name: string): Observable<Author> {
    this.isLoadingAuthors$$.next(true);

    return this.coursesService.createAuthor({ name }).pipe(
      tap((response) => {
        if (response.successful) {
          // Add new author to the existing authors array
          const currentAuthors = this.authors$$.value;
          this.authors$$.next([...currentAuthors, response.result]);
        }
      }),
      map((response) => response.result),
      finalize(() => this.isLoadingAuthors$$.next(false))
    );
  }

  /**
   * Get current loading state synchronously
   */
  get isLoading(): boolean {
    return this.isLoading$$.value;
  }

  /**
   * Get current authors loading state synchronously
   */
  get isLoadingAuthors(): boolean {
    return this.isLoadingAuthors$$.value;
  }
}
