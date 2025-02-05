import type { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserDetailsComponent } from './features/user/user-details.component';
import { UserListComponent } from './features/user/user-list.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: '/dashboard',
  },
];
