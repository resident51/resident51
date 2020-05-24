import { LoggedOutUser, UnverifiedUser, User, UserDocument } from 'types';

export const loggedOutUser: LoggedOutUser = {
  uid: null,
  displayName: '',
  email: '',
  permissions: 0,
  hall: null,
};

export const initializeLoggedInUserState = (userAuth: firebase.User): UnverifiedUser => {
  const nextUser = {
    // Merge in Firebase auth user properties
    uid: userAuth.uid,
    email: userAuth.email,
    displayName: userAuth.displayName,
    // Initialize other user properties while waiting for data from firestore.
    permissions: 0,
    hall: null,
    creationTime: '',
    kuEmail: null,
  };
  return nextUser as UnverifiedUser;
};

export const shouldUpdateUserState = (currentUser: User, userDoc: UserDocument): boolean => {
  if (currentUser.uid === null) return true;
  if (currentUser.email !== userDoc.email) return true;
  if (currentUser.displayName !== userDoc.displayName) return true;
  if (currentUser.permissions !== userDoc.permissions) return true;
  if (currentUser.hall !== userDoc.hall) return true;
  if (currentUser.kuEmail !== userDoc.kuEmail) return true;
  // #TODO the case for updated roles is not handled. But it's also not really used yet so w/e

  return false;
};
