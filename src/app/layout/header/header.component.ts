import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private themeService = inject(ThemeService);
  private readonly _authService = inject(AuthService);

  public isDarkMode = this.themeService.isDarkMode;
  public username = '';

  ngOnInit(): void {
    const currentUser = this._authService.currentUser();
    this.username = currentUser?.username || '';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  signout() {
    this._authService.signout();
  }
}
