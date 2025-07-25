import { Component } from "@angular/core";

import { Course } from "@app/shared/models";

import { mockedCoursesList, mockedAuthorsList } from "./shared/mocks/mock";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  coursesList: Course[] = mockedCoursesList.map((course) => ({
    ...course,
    authors: course.authors.map(
      (authorId) =>
        mockedAuthorsList.find((author) => author.id === authorId)?.name ||
        "Unknown"
    ),
  }));
  selectedCourse: Course = this.coursesList[0];

  onEditCourse(course: Course) {
    console.log("Edit course:", course);
  }

  onDeleteCourse(course: Course) {
    console.log("Delete course:", course);
  }
  onShowCourse(course: Course) {
    console.log("Show course:", course);
  }
}
