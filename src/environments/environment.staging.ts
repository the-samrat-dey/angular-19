import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://staging-api.yourapp.com/v1',
  version: '1.0.0',
  errorConfig: {
    enableLogging: true,
    logLevel: 'warn',
    maxErrorHistory: 100,
    sentryDsn: 'your-staging-sentry-dsn',
    apiTimeoutMs: 30000,
    retryAttempts: 3,
  },
  auth: {
    tokenKey: 'app_token',
    refreshTokenKey: 'app_refresh_token',
    expiryKey: 'app_token_expiry',
  },
  features: {
    enableErrorReporting: true,
    enableAnalytics: true,
    enableOfflineMode: true,
  },
};
