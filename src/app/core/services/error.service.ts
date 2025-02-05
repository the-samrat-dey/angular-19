import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';

export interface ErrorState {
  message: string;
  timestamp: string;
  code?: string;
  details?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private snackBar = inject(MatSnackBar);

  // Error history management with signals
  private errorHistory = signal<ErrorState[]>([]);

  // Computed signals for error analytics
  readonly hasErrors: Signal<boolean> = computed(
    () => this.errorHistory().length > 0
  );

  readonly lastError: Signal<ErrorState | null> = computed(
    () => this.errorHistory()[0] ?? null
  );

  // Show error message to user
  showError(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }

  // Show offline message
  showOfflineMessage(): void {
    this.showError('You appear to be offline. Please check your connection.');
  }

  // Log error for monitoring
  logError(error: ErrorState): void {
    // Add to local error history
    this.errorHistory.update((errors) => [error, ...errors].slice(0, 100));

    // Log to console in development
    if (!environment.production) {
      console.error('API Error:', error);
    }

    // Send to error monitoring service (e.g., Sentry)
    this.sendToErrorMonitoring(error);
  }

  // Clear error history
  clearErrors(): void {
    this.errorHistory.set([]);
  }

  // Get error history
  getErrorHistory(): ErrorState[] {
    return this.errorHistory();
  }

  private sendToErrorMonitoring(error: ErrorState): void {
    // Implementation for your error monitoring service
    // Example with Sentry:
    if (environment.production) {
      // Sentry.captureException(error);
    }
  }
}
