export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE', // Normal user access
  INACTIVE = 'INACTIVE', // Temporary deactivation by user
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION', // Email verification
  PHONE_VERIFICATION = 'PHONE_VERIFICATION', // Phone verification
  SUSPENDED = 'SUSPENDED', // Temporary ban
  BLOCKED = 'BLOCKED', // Permanent ban
  LOCKED = 'LOCKED', // Security lock (failed logins)
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: UserRoleEnum;
  status: UserStatus;
  isDeleted: boolean;
  deletedAt?: Date;
}
