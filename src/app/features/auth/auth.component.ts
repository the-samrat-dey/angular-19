import { Component, inject } from '@angular/core';
import { SignInComponent } from './signin.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  imports: [CommonModule, SignInComponent],
})
export class AuthComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  constructor() {
    if (this._authService.currentUser()) this._router.navigate(['/']);
  }
}
