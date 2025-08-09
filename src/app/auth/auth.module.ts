import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./services/auth.service";
import { SessionStorageService } from "./services/session-storage.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [SessionStorageService, AuthService],
})
export class AuthModule {}
