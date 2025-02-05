import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

import { ICredentials } from './auth.model';
import { IUser } from '@core/models/auth.model';

@Component({
  selector: 'app-signin',
  template: `<p>Sign In</p>`,
})
export class SignInComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  ngOnInit(): void {
    this.onSignIn({ username: 'sam', email: 'email', password: 'pwd' });
  }

  onSignIn(credentials: ICredentials) {
    this._authService.signin(credentials).subscribe({
      next: (user: IUser) => console.log(user),
      error: (error) => console.error(error),
    });
  }
}
