import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public async canActivate(): Promise<boolean> {
    if (this._authService.isAuthenticated()) {
      return true;
    }

    await this._router.navigate(['/signin']);
    return false;
  }
}
