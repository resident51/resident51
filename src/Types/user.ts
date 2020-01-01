import { firestore } from 'firebase'
import { Hall } from './common';

export interface UserInterface {
  uid: string,
  displayName: string | null,
  email: string | null,
  permissions: 0 | 1 | 2 | 3,
  hall?: Hall | null,
  getIdToken?: (forceRefresh?: boolean | undefined) => Promise<string>;
  verified?: boolean,
  verificationRequests?: firestore.Query | null,
};

export type verificationRequest = {
  name: string,
  email: string,
  hall: string,
}