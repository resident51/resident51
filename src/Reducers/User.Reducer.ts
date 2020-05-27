import { User, UserDocument } from '../types/';
import {
  initializeLoggedInUserState,
  loggedOutUser,
  shouldUpdateUserState,
} from '../contexts/UserProps';

export type UserActionType = 'LOGGED_IN' | 'USER_FOUND' | 'LOGGED_OUT';
export type UserAction =
  | { type: 'LOGGED_IN'; data: firebase.User }
  | { type: 'USER_FOUND'; data: UserDocument }
  | { type: 'LOGGED_OUT' };

const userReducer = (currentUser: User, action: UserAction): User => {
  switch (action.type) {
    case 'LOGGED_IN':
      return initializeLoggedInUserState(action.data);
    case 'USER_FOUND':
      if (shouldUpdateUserState(currentUser, action.data)) {
        return Object.assign({}, currentUser, action.data);
      } else {
        return currentUser;
      }
    case 'LOGGED_OUT':
    default: {
      return Object.assign({}, loggedOutUser);
    }
  }
};

export default userReducer;
