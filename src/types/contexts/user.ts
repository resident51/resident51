export type Hall =
  | 'Battenfeld'
  | 'Douthart'
  | 'Grace Pearson'
  | 'KK Amini'
  | 'Krehbiel'
  | 'Margaret Amini'
  | 'Miller'
  | 'Pearson'
  | 'Rieger'
  | 'Sellards'
  | 'Stephenson'
  | 'Watkins';

export interface UserRoles {
  hall: Hall;
  staff: string[];
  ashc: string[];
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  hall: Hall;
  hallVerified: boolean;
  roomNumber?: string;
  permissions: Record<string, unknown>;
  roles: UserRoles;
}

export interface UserCreationData {
  email: string;
  password: string;
  displayName: string;
  hall: Hall;
  roomNumber?: string;
}
