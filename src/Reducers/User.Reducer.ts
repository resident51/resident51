import { auth } from '../Firebase/firebase';

import { UserInterface } from '../Types/';

export type User = null | UserInterface;
export type UserActionType = 'LOGGED_OUT' | 'LOGGED_IN' | 'USER_FOUND' | 'NEW_USER' | 'LOGOUT';
export type UserAction =
  | { type: 'LOGGED_OUT' }
  | { type: 'LOGGED_IN', data: firebase.User }
  | { type: 'USER_FOUND', data: Pick<UserInterface, 'hall' | 'permissions' | 'verified'> }
  | { type: 'NEW_USER' }
  | { type: 'LOGOUT' };

export const loggedOutUser: UserInterface = {
  uid: '',
  displayName: null,
  email: null,
  permissions: 0,
  // #TODO logged out user should have email: '', permissions: 0, etc.
  // null should only be used for when we are waiting for data to be fetched.
};

const userReducer = (currentUser: User, action: UserAction): User => {
  switch (action.type) {
    case "LOGGED_OUT":
      return loggedOutUser;
    case "LOGGED_IN":
      // Merge in Firebase auth user properties
      return Object.assign(action.data, { permissions: 0 as UserInterface['permissions'] });
    case "USER_FOUND":
      // #TODO this runs even when the user is updated, ie after requesting verification.
      // We should separate each change to the user into separate actions.
      return Object.assign(currentUser, action.data);
    case "NEW_USER":
      if (currentUser === null)
        return loggedOutUser;
      return currentUser;
    case "LOGOUT":
      auth.signOut();
      if (currentUser === null)
        return loggedOutUser;
      return currentUser;
    default:
      if (currentUser === null)
        return loggedOutUser;
      return currentUser;
  }
};

export default userReducer;