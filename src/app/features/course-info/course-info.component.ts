import { Subject, takeUntil, Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "../../services/courses-store.service";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  course$!: Observable<Course>;
  isLoading$ = this.coursesStoreService.isLoading$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService
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
    this.course$ = this.coursesStoreService
      .getCourse(id)
      .pipe(takeUntil(this.destroy$));

    this.course$.subscribe({
      next: (course) => {
        console.log("Course loaded:", course);
      },
      error: (error) => {
        console.error("Error loading course:", error);
        this.onBack(); // Navigate back if course not found
      },
    });
  }

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
