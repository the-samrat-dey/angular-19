import type { Routes } from '@angular/router';

import { AuthComponent } from './features/auth/auth.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { AuthGuard } from '@core/guards/auth.guard';
import { RoleGuard } from '@core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
      {
        path: 'users',
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./features/user/user.routes').then((m) => m.USER_ROUTES),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
