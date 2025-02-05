import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = signal(false);

  isDarkMode = this.darkMode.asReadonly();

  constructor() {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode.set(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.darkMode.set(prefersDark);
    }

    this.applyTheme();
  }

  toggleTheme() {
    this.darkMode.update((current) => !current);
    this.applyTheme();
  }

  private applyTheme() {
    const isDark = this.darkMode();
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
