import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "@app/user/services/user.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { AdminGuard } from "@app/user/guards/admin.guard";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserService, UserStoreService, AdminGuard],
})
export class UserModule {}
