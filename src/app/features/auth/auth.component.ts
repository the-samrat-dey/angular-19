import { Component } from '@angular/core';
import { SignInComponent } from './signin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  imports: [CommonModule, SignInComponent],
})
export class AuthComponent {}
