import { Hall } from './common';

export type Permissions = 0 | 1 | 2 | 3;

export type TokenData = {
  permissions: Permissions;
  hall: Hall;
};

export type Roles = {
  ashc: string[];
  committees: string[];
  hall: string[];
  staff: string[];
};

/**
 * This counts as documentation right?
 * Hierarchy:
 * UserBase {
 *   LoggedOutUser
 *   LoggedInUser {
 *     UnverifiedUser {
 *       UserWithoutRequest
 *       UserWithRequest
 *     }
 *     VerifiedUser {
 *       Resident
 *       Editor
 *       Admin
 *     }
 *   }
 * }
 */

/**
 * User interface properties include:
 * // From auth interface.
 * uid
 * email
 * displayName
 * // From token.
 * permissions
 * hall
 * // Additional firestore data.
 * creationTime
 * kuEmail
 * roles
 */

// Extensible user interface
export interface UserBase {
  uid: string | null;
  email: string;
  displayName: string;
  permissions: Permissions;
}

export interface LoggedInUser extends UserBase {
  uid: string;
  email: string;
  displayName: string;
  permissions: Permissions;
  hall: Hall | null;
  creationTime: string;
  kuEmail: string | null;
  roles?: Roles;
}
export interface VerifiedUser extends LoggedInUser {
  permissions: 1 | 2 | 3;
  hall: Hall;
  kuEmail: string;
}
export interface Resident extends VerifiedUser {
  permissions: 1;
}
export interface Editor extends VerifiedUser {
  permissions: 2;
}
export interface Admin extends VerifiedUser {
  permissions: 3;
}
export interface UnverifiedUser extends LoggedInUser {
  permissions: 0;
  hall: Hall | null;
  kuEmail: string | null;
}
export interface UnverifiedWithoutRequest extends UnverifiedUser {
  hall: null;
  kuEmail: null;
}
export interface UnverifiedWithRequest extends UnverifiedUser {
  hall: Hall;
  kuEmail: string;
}

export interface LoggedOutUser extends UserBase {
  uid: null;
  permissions: 0;
  displayName: '';
  email: '';
}

export type User = LoggedOutUser | UnverifiedUser | Resident | Editor | Admin;

export interface UserDocument {
  email: string;
  displayName: string;
  permissions: Permissions;
  hall: Hall | null;
  creationTime: string;
  kuEmail: string | null;
  roles?: Roles;
}
export interface VisibleUser extends Omit<UserDocument, 'hall' | 'kuEmail'> {
  uid: string;
  hall: Hall;
  kuEmail: string;
}
export interface ConfirmedVerificationRequest extends Omit<UserDocument, 'hall' | 'kuEmail'> {
  hall: Hall;
  kuEmail: string;
}

export type VerificationRequest = {
  name: string;
  email: string;
  hall: string;
};
