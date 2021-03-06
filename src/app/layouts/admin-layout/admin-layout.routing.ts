import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../auth/login/login.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { UsersComponent } from 'app/users/users.component';
import {TestComponent} from '../../test/test.component'
import { TestDoneComponent } from '../../test-done/test-done.component';
import { FilerepositoryComponent } from 'app/filerepository/filerepository.component';
import { IsAdminGuard } from 'app/is-admin-guard/is-admin.guard';



export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent ,canActivate: [IsAdminGuard]},
    { path: 'login',      component: LoginComponent },
    { path: 'Test',      component: TestComponent  ,canActivate: [IsAdminGuard]},
    { path: 'Profile',      component: UserProfileComponent  ,canActivate: [IsAdminGuard]},
    { path: 'Users',      component: UsersComponent, canActivate: [IsAdminGuard] },
    { path: 'TestsDone',      component: TestDoneComponent  ,canActivate: [IsAdminGuard]},
    { path: 'filerepository',      component: FilerepositoryComponent  ,canActivate: [IsAdminGuard]},

   
];
