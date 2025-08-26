import { Action, createReducer, on } from "@ngrx/store";

import { Course } from "@app/shared/models";
import * as CoursesActions from "./courses.actions";

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
};

export const coursesReducer = createReducer(
  initialState,

  // Request all courses actions
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  // Request single course actions
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // Request filtered courses actions
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    isSearchState: true,
    errorMessage: error,
  })),

  // Delete course actions
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // Edit course actions
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)),
    errorMessage: "",
  })),

  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // Create course actions
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    allCourses: [...state.allCourses, course],
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
