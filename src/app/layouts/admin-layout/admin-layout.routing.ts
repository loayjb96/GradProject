import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../auth/login/login.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { UsersComponent } from 'app/users/users.component';



export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'Test',      component: LoginComponent },
    { path: 'Profile',      component: UserProfileComponent },
    { path: 'Users',      component: UsersComponent },

   
];
