export interface Environment {
  production: boolean;
  apiUrl: string;
  version: string;
  errorConfig: {
    enableLogging: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
    maxErrorHistory: number;
    sentryDsn?: string;
    apiTimeoutMs: number;
    retryAttempts: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    expiryKey: string;
  };
  features: {
    enableErrorReporting: boolean;
    enableAnalytics: boolean;
    enableOfflineMode: boolean;
  };
}
