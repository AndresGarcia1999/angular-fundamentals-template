import { ActionReducerMap } from "@ngrx/store";

import { CoursesState, coursesReducer } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

// State interface
export interface State {
  courses: CoursesState;
}

// Reducers
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
};

// Effects
export const effects = [CoursesEffects];
