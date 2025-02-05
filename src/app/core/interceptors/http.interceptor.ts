import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ErrorService } from '@core/services/error.service';
import { LoadingService } from '@core/services/loading.service';
import { EMPTY, Observable, timer, throwError } from 'rxjs';
import { catchError, finalize, retry, timeout } from 'rxjs/operators';

// Custom error type for structured error handling
interface ApiError {
  code: string;
  message: string;
  timestamp: string;
  path: string;
  details?: unknown;
}

// Configuration for the interceptor
const INTERCEPTOR_CONFIG = {
  TIMEOUT_MS: 30000,
  MAX_RETRIES: 2,
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
};

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const loadingService = inject(LoadingService);
  const errorService = inject(ErrorService);
  const authService = inject(AuthService);

  // Start loading indicator
  loadingService.start();

  // Clone request and add headers
  const modifiedRequest = request.clone({
    setHeaders: getHeaders(),
    withCredentials: true, // Enable if you're using cookies
  });

  return next(modifiedRequest).pipe(
    // Set timeout for all requests
    timeout(INTERCEPTOR_CONFIG.TIMEOUT_MS),

    // Retry logic for specific status codes
    retry({
      count: INTERCEPTOR_CONFIG.MAX_RETRIES,
      delay: (error, retryCount) => {
        if (!shouldRetry(error)) {
          return throwError(() => error);
        }
        const delayMs = calculateRetryDelay(retryCount);
        return timer(delayMs);
      },
    }),

    // Error handling
    catchError((error: HttpErrorResponse) =>
      handleError(error, router, errorService)
    ),

    // Cleanup
    finalize(() => {
      loadingService.stop();
    })
  );
};

// Helper functions
function getHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Request-ID': crypto.randomUUID(), // Request tracking
    'X-Client-Version': '1.0.0', // App version
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

function calculateRetryDelay(retryCount: number): number {
  // Exponential backoff with jitter
  const baseDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, ...
  const jitter = Math.random() * 1000; // Random delay between 0-1000ms
  return baseDelay + jitter;
}

function shouldRetry(error: HttpErrorResponse): boolean {
  return (
    error instanceof HttpErrorResponse &&
    INTERCEPTOR_CONFIG.RETRY_STATUS_CODES.includes(error.status)
  );
}

function handleError(
  error: HttpErrorResponse,
  router: Router,
  errorService: ErrorService
): Observable<never> {
  const apiError: ApiError = {
    code: error.status.toString(),
    message: getErrorMessage(error),
    timestamp: new Date().toISOString(),
    path: error.url ?? 'unknown',
    details: error.error,
  };

  // Handle specific error cases
  switch (error.status) {
    case HttpStatusCode.Unauthorized:
      localStorage.removeItem('token');
      router.navigate(['/auth/signin']);
      return EMPTY;

    case HttpStatusCode.Forbidden:
      router.navigate(['/forbidden']);
      break;

    case HttpStatusCode.NotFound:
      router.navigate(['/not-found']);
      break;

    case HttpStatusCode.GatewayTimeout:
      // Show offline message or retry
      errorService.showOfflineMessage();
      break;
  }

  // Log error for monitoring
  errorService.logError(apiError);

  // Return structured error
  return throwError(() => apiError);
}

function getErrorMessage(error: HttpErrorResponse): string {
  // Rest of the getErrorMessage function remains the same
  if (error.error instanceof ErrorEvent) {
    return `Client Error: ${error.error.message}`;
  }

  // Map common error codes to user-friendly messages
  switch (error.status) {
    case HttpStatusCode.BadRequest:
      return 'Invalid request. Please check your input.';
    case HttpStatusCode.Unauthorized:
      return 'Please sign in to continue.';
    case HttpStatusCode.Forbidden:
      return "You don't have permission to access this resource.";
    case HttpStatusCode.NotFound:
      return 'The requested resource was not found.';
    case HttpStatusCode.RequestTimeout:
      return 'The request timed out. Please try again.';
    case HttpStatusCode.TooManyRequests:
      return 'Too many requests. Please try again later.';
    case HttpStatusCode.InternalServerError:
      return 'An internal server error occurred. Please try again later.';
    default:
      return error.error?.message || 'An unexpected error occurred.';
  }
}
