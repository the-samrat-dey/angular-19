import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import type { ICredentials } from '@features/auth/auth.model';
import { HttpService } from './http.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { IUser, UserRoleEnum } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _httpService = inject(HttpService);

  public readonly currentUser = signal<IUser | null>(null);

  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly getUserRole = computed(
    () => this.currentUser()?.role ?? UserRoleEnum.USER
  );

  public signin(credentials: ICredentials): Observable<IUser> {
    return this._httpService
      .post<IUser, ICredentials>(API_ENDPOINTS.AUTH.SIGNIN, credentials)
      .pipe(tap((user) => this.currentUser.set(user)));
  }
}
