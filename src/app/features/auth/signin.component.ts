import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ICredentials } from './auth.model';
import { IUser } from '@core/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignInComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private _fb = inject(FormBuilder);

  signinForm: FormGroup;

  constructor() {
    this.signinForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.onSignIn({ username: 'sam', email: 'email', password: 'pwd' });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.onSignIn(this.signinForm.value);
    }
  }

  onSignIn(credentials: ICredentials) {
    this._authService.signin(credentials).subscribe({
      next: (user: IUser) => console.log(user),
      error: (error) => console.error(error),
    });
  }
}
