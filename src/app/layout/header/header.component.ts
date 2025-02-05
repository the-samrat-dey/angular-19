import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '@core/services/theme.service';

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
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <!-- Left side -->
      <div class="left-section">
        <a
          mat-button
          routerLink="/dashboard"
          routerLinkActive="active-link"
          class="nav-link"
        >
          <mat-icon>dashboard</mat-icon>
          <span>Dashboard</span>
        </a>
        <a
          mat-button
          routerLink="/users"
          routerLinkActive="active-link"
          class="nav-link"
        >
          <mat-icon>people</mat-icon>
          <span>Users</span>
        </a>
      </div>

      <!-- Right side -->
      <div class="right-section">
        <a
          mat-button
          routerLink="/auth"
          routerLinkActive="active-link"
          class="nav-link"
        >
          <mat-icon>login</mat-icon>
          <span>Sign In</span>
        </a>
        <a
          mat-button
          routerLink="/auth"
          routerLinkActive="active-link"
          class="nav-link"
        >
          <mat-icon>person_add</mat-icon>
          <span>Sign Up</span>
        </a>

        <!-- Theme Toggle -->
        <mat-slide-toggle
          [checked]="isDarkMode()"
          (change)="toggleTheme()"
          class="theme-toggle"
        >
          <mat-icon>{{ isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
        </mat-slide-toggle>

        <!-- Profile Menu -->
        <button mat-button [matMenuTriggerFor]="profileMenu" class="nav-link">
          <mat-icon>account_circle</mat-icon>
          <span>Profile</span>
        </button>
        <mat-menu #profileMenu="matMenu">
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>My Profile</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .header-toolbar {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
      }

      .left-section,
      .right-section {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .active-link {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .theme-toggle {
        margin: 0 16px;
      }

      mat-icon {
        margin-right: 4px;
      }

      @media (max-width: 768px) {
        .nav-link span {
          display: none;
        }

        mat-icon {
          margin-right: 0;
        }

        .header-toolbar {
          padding: 0 8px;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);

  isDarkMode = this.themeService.isDarkMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
