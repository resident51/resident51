import { firestore, User as FirebaseUser } from "firebase/app";
import { Hall } from "./common";

export interface UserInterface extends Pick<FirebaseUser, "getIdToken"> {
  uid: string;
  displayName: string | null;
  email: string | null;
  permissions: 0 | 1 | 2 | 3;
  hall?: Hall | null;
  verified?: boolean;
  verificationRequests?: firestore.Query | null;
}

export type verificationRequest = {
  name: string;
  email: string;
  hall: string;
};
