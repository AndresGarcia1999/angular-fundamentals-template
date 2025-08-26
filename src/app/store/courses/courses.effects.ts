import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, withLatestFrom } from "rxjs/operators";

import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";
import { CoursesService } from "@app/services/courses.service";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router,
    private store: Store
  ) {}

  // Effect to get all courses
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((response) =>
            CoursesActions.requestAllCoursesSuccess({
              courses: response.result,
            })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestAllCoursesFail({
                error: error.message || "Failed to load courses",
              })
            )
          )
        )
      )
    )
  );

  // Effect to get filtered courses
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.store.select(CoursesSelectors.getAllCourses)),
      map(([action, allCourses]) => {
        const filteredCourses = allCourses.filter((course) =>
          course.title.toLowerCase().includes(action.title.toLowerCase())
        );
        return CoursesActions.requestFilteredCoursesSuccess({
          courses: filteredCourses,
        });
      }),
      catchError((error) =>
        of(
          CoursesActions.requestFilteredCoursesFail({
            error: error.message || "Failed to filter courses",
          })
        )
      )
    )
  );

  // Effect to get specific course
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((response) =>
            CoursesActions.requestSingleCourseSuccess({
              course: response.result,
            })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestSingleCourseFail({
                error: error.message || "Failed to load course",
              })
            )
          )
        )
      )
    )
  );

  // Effect to delete course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) =>
            of(
              CoursesActions.requestDeleteCourseFail({
                error: error.message || "Failed to delete course",
              })
            )
          )
        )
      )
    )
  );

  // Effect to edit course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((response) =>
            CoursesActions.requestEditCourseSuccess({
              course: response.result,
            })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestEditCourseFail({
                error: error.message || "Failed to edit course",
              })
            )
          )
        )
      )
    )
  );

  // Effect to create course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((response) =>
            CoursesActions.requestCreateCourseSuccess({
              course: response.result,
            })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestCreateCourseFail({
                error: error.message || "Failed to create course",
              })
            )
          )
        )
      )
    )
  );

  // Effect to redirect to courses page
  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        map(() => {
          this.router.navigate(["/courses"]);
          return { type: "NO_ACTION" };
        })
      ),
    { dispatch: false }
  );
}
