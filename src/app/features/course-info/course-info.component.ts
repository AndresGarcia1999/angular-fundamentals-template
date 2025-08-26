import { Subject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  course$ = this.coursesFacade.course$;
  isLoading$ = this.coursesFacade.isSingleCourseLoading$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.loadCourse(courseId);
    } else {
      console.error("No course ID found in route");
      this.onBack();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCourse(id: string): void {
    this.coursesFacade.getSingleCourse(id);
  }

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
