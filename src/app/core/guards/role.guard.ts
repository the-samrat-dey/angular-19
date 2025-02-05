import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserRoleEnum } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public async canActivate(): Promise<boolean> {
    if (this._authService.getUserRole() === UserRoleEnum.ADMIN) {
      return true;
    }

    await this._router.navigate(['/signin']);
    return false;
  }
}
