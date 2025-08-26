import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";

import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";
import { Course, CourseFormData } from "@app/shared/models";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  // Observable properties for component consumption
  public readonly isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );

  public readonly isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );

  public readonly isSearchingState$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );

  public readonly courses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getCourses)
  );

  public readonly allCourses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getAllCourses)
  );

  public readonly course$: Observable<Course | null> = this.store.pipe(
    select(CoursesSelectors.getCourse)
  );

  public readonly errorMessage$: Observable<string> = this.store.pipe(
    select(CoursesSelectors.getErrorMessage)
  );

  constructor(private store: Store) {}

  // Action dispatching methods
  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({ title: searchValue })
    );
  }

  editCourse(body: CourseFormData, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
  }

  createCourse(body: CourseFormData): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
