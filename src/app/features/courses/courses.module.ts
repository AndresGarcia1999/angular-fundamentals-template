import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "@app/shared/shared.module";
import { CoursesRoutingModule } from "@features/courses/courses-routing.module";

import { CoursesComponent } from "@features/courses/courses.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";
import { CoursesListComponent } from "@features/courses/courses-list/courses-list.component";

@NgModule({
  declarations: [CoursesComponent, CourseInfoComponent, CoursesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    SharedModule,
  ],
})
export class CoursesModule {}
