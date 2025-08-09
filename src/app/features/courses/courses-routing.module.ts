import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CoursesComponent } from "@features/courses/courses.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";
import { CourseComponent } from "@shared/components/course-form/course-form.component";

import { AdminGuard } from "@app/user/guards/admin.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "add",
    component: CourseComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
  {
    path: "edit/:id",
    component: CourseComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
  {
    path: ":id",
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
