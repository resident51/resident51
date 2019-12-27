import { firestore } from 'firebase'
import { Hall } from './common';

export interface UserInterface {
  uid: string,
  displayName: string | null,
  email: string | null,
  hall?: Hall | null,
  getIdToken?: (forceRefresh?: boolean | undefined) => Promise<string>;
  permissions?: 0 | 1 | 2 | 3,
  verified?: boolean,
  verificationRequests?: firestore.Query | null,
};

export type verificationRequest = {
  name: string,
  email: string,
  hall: string,
}