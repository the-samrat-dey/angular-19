import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import type { ICredentials } from '@features/auth/auth.model';
import { HttpService } from './http.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { IUser, UserRoleEnum, UserStatus } from '../models/auth.model';
import { Router } from '@angular/router';

const USER_SEED_DATA: IUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@gmail.com',
    role: UserRoleEnum.ADMIN,
    status: UserStatus.ACTIVE,
    isDeleted: false,
    deletedAt: null,
  },
  {
    id: '2',
    username: 'user',
    email: 'user@gmail.com',
    role: UserRoleEnum.USER,
    status: UserStatus.ACTIVE,
    isDeleted: false,
    deletedAt: null,
  },
];

const CURRENT_USER: IUser = USER_SEED_DATA[0];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _httpService = inject(HttpService);
  private readonly _router = inject(Router);

  public readonly currentUser = signal<IUser | null>(null);

  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly getUserRole = computed(
    () => this.currentUser()?.role ?? UserRoleEnum.USER
  );

  constructor() {
    const user_data: IUser | null = localStorage.getItem('user_data')
      ? JSON.parse(localStorage.getItem('user_data') as string)
      : null;

    if (user_data) this.currentUser.set(user_data);
  }

  public signin(credentials: ICredentials): Observable<IUser> {
    return this._httpService
      .post<IUser, ICredentials>(API_ENDPOINTS.AUTH.SIGNIN, credentials)
      .pipe(
        tap(() => {
          const token =
            Math.random().toString(36).substring(2) + Date.now().toString(36);
          this.currentUser.set(CURRENT_USER);
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(CURRENT_USER));
        }),
        map(() => CURRENT_USER)
      );
  }

  public signout() {
    localStorage.setItem('auth_token', '');
    localStorage.setItem('user_data', '');
    this.currentUser.set(null);
    this._router.navigate(['/auth']);
  }
}
