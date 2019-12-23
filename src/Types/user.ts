import { Hall } from './common';

export interface UserInterface {
    uid: string,
    displayName: string | null,
    email: string | null,
    hall ?: Hall | null,
    permissions ?: 0 | 1 | 2 | 3,
    verified ?: boolean,
  };
  
  export type verificationRequest = {
    name: string,
    email: string,
    hall: string,
  }