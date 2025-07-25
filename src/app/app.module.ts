import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { SharedModule } from "@shared/shared.module";

import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";

import { CoursesService } from "@app/services/courses.service";
import { CoursesStoreService } from "@app/services/courses-store.service";

import { AppComponent } from "@app/app.component";
import { CoursesComponent } from "./features/courses/courses.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";
import { CoursesListComponent } from "./features/courses/courses-list/courses-list.component";

@NgModule({
  declarations: [
    AppComponent,
    CourseInfoComponent,
    CoursesComponent,
    CoursesListComponent,
  ],
  imports: [BrowserModule, SharedModule, FontAwesomeModule],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
