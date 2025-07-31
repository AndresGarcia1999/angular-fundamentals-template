import { Component, Input, OnInit, OnChanges } from "@angular/core";

import { Course } from "@app/shared/models/course.model";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit, OnChanges {
  @Input() courses: Course[] = [];
  filteredCourses: Course[] = [];

  ngOnInit() {
    // Initialize filtered courses with all courses
    this.filteredCourses = [...this.courses];
  }

  ngOnChanges() {
    // Update filtered courses when input courses change
    this.filteredCourses = [...this.courses];
  }

  onSearch(term: string) {
    if (!term || term.trim() === "") {
      // If no search term, show all courses
      this.filteredCourses = [...this.courses];
    } else {
      // Filter courses based on search term
      this.filteredCourses = this.courses.filter((course) =>
        course.title.toLowerCase().includes(term.toLowerCase())
      );
    }
  }

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
