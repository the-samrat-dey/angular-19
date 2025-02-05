export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    SIGNOUT: '/auth/signout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    VERIFY_PHONE: '/auth/verify-phone',
  },
  USER: {
    // Query Operations
    FIND_ONE: (id: string) => `/users/${id}`,
    FIND_MANY: '/users',
    SEARCH: '/users/search',

    // Create Operations
    CREATE_ONE: '/users',
    CREATE_MANY: '/users/bulk',

    // Update Operations
    UPDATE_ONE: (id: string) => `/users/${id}`,
    UPDATE_MANY: '/users/bulk-update',

    // Delete Operations
    SOFT_DELETE_ONE: (id: string) => `/users/${id}`,
    SOFT_DELETE_MANY: '/users/bulk-delete',
    PERMANENT_DELETE_ONE: (id: string) => `/users/${id}/permanent-delete`,
    PERMANENT_DELETE_MANY: '/users/permanent-bulk-delete',
    RESTORE: (id: string) => `/users/${id}/restore`,
  },
};
