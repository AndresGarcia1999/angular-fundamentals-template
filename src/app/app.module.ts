import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SharedModule } from "@shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";

import { CoursesService } from "@app/services/courses.service";
import { AuthService } from "@app/auth/services/auth.service";
import { UserService } from "@app/user/services/user.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { SessionStorageService } from "@app/auth/services/session-storage.service";

import { TokenInterceptor } from "@app/auth/interceptors/token.interceptor";

import { AppComponent } from "@app/app.component";
import { LoginFormComponent } from "./shared/components/login-form/login-form.component";
import { RegistrationFormComponent } from "./shared/components/registration-form/registration-form.component";

@NgModule({
  declarations: [AppComponent, LoginFormComponent, RegistrationFormComponent],
  imports: [
    FormsModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [
    // Window injection for SessionStorageService
    {
      provide: "Window",
      useValue: window,
    },

    // HTTP Interceptor for token management
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

    // Services
    AuthService,
    UserService,
    CoursesService,
    UserStoreService,
    CoursesStoreService,
    SessionStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
