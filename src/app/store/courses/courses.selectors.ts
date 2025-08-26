import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";

// Feature selector
export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

// Loading state selectors
export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSingleCourseLoading
);

// Data selectors
export const getCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

export const getAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.course
);

// Error selector
export const getErrorMessage = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.errorMessage
);
