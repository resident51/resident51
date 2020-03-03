import React, { useReducer, createContext } from 'react';

import { User, VisibleUser } from '../Types/';

import UserReducer, { UserAction } from '../Reducers/User.Reducer';
import { loggedOutUser } from './UserProps';

import useFirebaseAuth from '../Hooks/useFirebaseAuth';
import useVerificationRequests from '../Hooks/useVerificationRequests';
import useVerifiedResidents from '../Hooks/useVerifiedResidents';

interface UserContextProps {
  user: User;
  refreshToken: () => Promise<string>;
  userDispatch: React.Dispatch<UserAction>;
  isLoggingIn: boolean;
  setIsLoggingIn: (next: boolean) => void;
  usersRequestingVerify: VisibleUser[];
  verifiedResidents: VisibleUser[];
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider: React.FC = props => {
  const [user, userDispatch] = useReducer(UserReducer, loggedOutUser);
  const [userAuth, loginState] = useFirebaseAuth(user, userDispatch);
  const usersRequestingVerify = useVerificationRequests(user);
  const verifiedResidents = useVerifiedResidents(user);

  const [isLoggingIn, setIsLoggingIn] = loginState;
  const refreshToken = (): Promise<string> =>
    userAuth ? userAuth.getIdToken(true) : Promise.reject('');

  return (
    <UserContext.Provider
      value={{
        user,
        refreshToken,
        isLoggingIn,
        setIsLoggingIn,
        userDispatch,
        usersRequestingVerify,
        verifiedResidents,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
