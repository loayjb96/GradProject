import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../auth/login/login.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { UsersComponent } from 'app/users/users.component';
import {TestComponent} from '../../test/test.component'
import { TestDoneComponent } from '../../test-done/test-done.component';
import { FilerepositoryComponent } from 'app/filerepository/filerepository.component';



export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'Test',      component: TestComponent },
    { path: 'Profile',      component: UserProfileComponent },
    { path: 'Users',      component: UsersComponent },
    { path: 'TestsDone',      component: TestDoneComponent },
    { path: 'filerepository',      component: FilerepositoryComponent },

   
];
