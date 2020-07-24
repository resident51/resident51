export interface UserRoles {
  hall: string[];
  staff: string[];
  ashc: string[];
}

export interface User {
  uid: string;
  email: string;
  emailVerified?: boolean;
  displayName: string;
  hall: string;
  hallVerified: boolean;
  roomNumber?: string;
  permissions: Record<string, unknown>;
  roles: UserRoles;
}

export interface UserCreationData {
  email: string;
  password: string;
  displayName: string;
  hall: string;
  roomNumber?: string;
}
