import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../auth/login/login.component';
import {AuthService} from '../../auth/login/auth.service'
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsersComponent } from '../../users/users.component';
import { DialogOverviewExampleDialog } from '../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteWarnComponent } from '../../delete-warn/delete-warn.component';
import { TestComponent } from '../../test/test.component';





import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  
  
} from '@angular/material';
import { AngularFireStorageModule } from '@angular/fire/storage';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    AngularFireStorageModule,
    
  ],
  // providers: [AuthService],
  declarations: [
    DashboardComponent,
    LoginComponent,
    UserProfileComponent,
    UsersComponent,
    DialogOverviewExampleDialog,
    DeleteWarnComponent,
    TestComponent,
   

  ],
  entryComponents:[DialogOverviewExampleDialog,DeleteWarnComponent]
})


export class AdminLayoutModule {}
