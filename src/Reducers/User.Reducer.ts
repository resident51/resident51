import { UserInterface, Permissions } from '../Types/';

export type User = null | UserInterface;
export type UserActionType = 'LOGGED_OUT' | 'LOGGED_IN' | 'USER_FOUND' | 'NEW_USER' | 'LOGOUT';
export type UserAction =
  | { type: 'LOGGED_OUT' }
  | { type: 'LOGGED_IN'; data: firebase.User }
  | {
      type: 'USER_FOUND';
      data: Pick<UserInterface, 'hall' | 'permissions' | 'verified'>;
    }
  | { type: 'NEW_USER' }
  | { type: 'LOGOUT' };

export const loggedOutUser: UserInterface = {
  uid: '',
  displayName: null,
  email: null,
  kuEmail: '',
  permissions: 0,
  getIdToken: (forceRefresh?: boolean) => new Promise(r => r('')),
  // #TODO logged out user should have email: '', permissions: 0, etc.
  // null should only be used for when we are waiting for data to be fetched.
};

const userReducer = (currentUser: User, action: UserAction): User => {
  switch (action.type) {
    case 'LOGGED_IN': {
      // Merge in Firebase auth user properties
      const permissions = 0 as Permissions;
      const kuEmail = '' as UserInterface['kuEmail'];
      return Object.assign(action.data, { permissions, kuEmail });
    }
    case 'USER_FOUND': {
      // #TODO this runs even when the user is updated, ie after requesting verification. hibbity jibbiyty
      // We should separate each change to the user into separate actions.
      return Object.assign({}, currentUser, action.data);
    }
    case 'LOGGED_OUT':
    case 'NEW_USER':
    case 'LOGOUT':
    default: {
      if (currentUser === null) return Object.assign({}, loggedOutUser);
      return Object.assign({}, currentUser);
    }
  }
};

export default userReducer;
