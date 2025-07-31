import { Component } from "@angular/core";

import { Course } from "@app/shared/models";

import { mockedCoursesList } from "./shared/mocks/mock";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  coursesList: Course[] = mockedCoursesList;
  selectedCourse: Course = this.coursesList[0];
}
