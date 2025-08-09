import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "@app/auth/services/auth.service";
import { SessionStorageService } from "@app/auth/services/session-storage.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [SessionStorageService, AuthService],
})
export class AuthModule {}
