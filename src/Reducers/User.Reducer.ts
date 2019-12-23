import { auth } from '../Firebase/firebase';

import { UserInterface } from '../Types/';

export type User = null | UserInterface;

export type UserActionType = 'LOGGED_OUT' | 'LOGGED_IN'| 'USER_FOUND'| 'NEW_USER'| 'LOGOUT';

export type UserAction = 
  | { type: 'LOGGED_OUT' }
  | { type: 'LOGGED_IN', authUser: firebase.User }
  | { type: 'USER_FOUND', R51User: UserInterface }
  | { type: 'NEW_USER' }
  | { type: 'LOGOUT' };

export const loggedOutUser = {
  uid: '',
  displayName: null,
  email: null,
}

const userReducer = (currentUser: User, action: UserAction): User => {
  switch (action.type) {
    case "LOGGED_OUT":
      return loggedOutUser;
    case "LOGGED_IN":
      const { authUser } = action;
      const nextUser = {
        displayName: authUser.displayName,
        uid: authUser.uid,
        email: authUser.email,
      }
      // Merge in Firebase auth user properties
      return nextUser;
    case "USER_FOUND":
      const { hall, permissions, verified } = action.R51User;
      const mergingUser = currentUser as UserInterface;
      return { ...mergingUser, hall, permissions, verified };
    case "NEW_USER":
      if(currentUser === null)
        return loggedOutUser;
      return currentUser;
    case "LOGOUT":
      auth.signOut();
      if(currentUser === null)
        return loggedOutUser;
      return currentUser;
    default:
      if(currentUser === null)
        return loggedOutUser;
      return currentUser;
  }
};

export default userReducer;