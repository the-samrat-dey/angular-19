import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IUser } from '@core/models/auth.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignInComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private _fb = inject(FormBuilder);

  signinForm: FormGroup;

  constructor() {
    this.signinForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this._authService.signin(this.signinForm.value).subscribe({
        next: (user: IUser) => {
          if (user) this._router.navigate(['/']);
        },
        error: (error) => console.error(error),
      });
    }
  }
}
