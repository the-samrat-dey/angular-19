import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  version: '1.0.0',
  errorConfig: {
    enableLogging: true,
    logLevel: 'debug',
    maxErrorHistory: 100,
    apiTimeoutMs: 30000,
    retryAttempts: 3,
  },
  auth: {
    tokenKey: 'app_token',
    refreshTokenKey: 'app_refresh_token',
    expiryKey: 'app_token_expiry',
  },
  features: {
    enableErrorReporting: false,
    enableAnalytics: false,
    enableOfflineMode: true,
  },
};
