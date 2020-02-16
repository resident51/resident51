import { User, UserDocument, UnverifiedUser } from '../Types/';

import { loggedOutUser } from '../Contexts/UserProps';

export type UserActionType = 'LOGGED_OUT' | 'LOGGED_IN' | 'USER_FOUND' | 'LOGOUT';
export type UserAction =
  | { type: 'LOGGED_OUT' }
  | { type: 'LOGGED_IN'; data: firebase.User }
  | { type: 'USER_FOUND'; data: UserDocument }
  | { type: 'LOGOUT' };

const userReducer = (currentUser: User, action: UserAction): User => {
  switch (action.type) {
    case 'LOGGED_IN': {
      // Merge in Firebase auth user properties
      const nextUser = {
        uid: action.data.uid,
        email: action.data.email,
        displayName: action.data.displayName,
        // Initialize other user properties while waiting for data from firestore.
        permissions: 0,
        hall: null,
        creationTime: '',
        kuEmail: null,
      };
      return nextUser as UnverifiedUser;
    }
    case 'USER_FOUND': {
      const updatedObj = Object.assign({}, currentUser, action.data);
      if (!currentUser.uid) return updatedObj;
      if (currentUser.email !== action.data.email) return updatedObj;
      if (currentUser.displayName !== action.data.displayName) return updatedObj;
      if (currentUser.permissions !== action.data.permissions) return updatedObj;
      if (currentUser.hall !== action.data.hall) return updatedObj;
      if (currentUser.kuEmail !== action.data.kuEmail) return updatedObj;
      // #TODO the case for updated roles is not handled.
      // If there is no change, skip update and return the same user object.
      return currentUser;
    }
    // case 'NEW_USER': // idk what I'm doing with this one but ???. can maybe do setLoggingIn here instead?.
    case 'LOGGED_OUT':
    case 'LOGOUT':
    default: {
      if (currentUser === null) return Object.assign({}, loggedOutUser);
      return Object.assign({}, currentUser);
    }
  }
};

export default userReducer;
