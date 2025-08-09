import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginFormComponent } from "./shared/components/login-form/login-form.component";
import { RegistrationFormComponent } from "./shared/components/registration-form/registration-form.component";

import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/courses",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
