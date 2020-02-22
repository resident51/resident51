import React, { useReducer, useState, createContext } from 'react';

import { User, VisibleUser } from '../Types/';

import UserReducer, { UserAction } from '../Reducers/User.Reducer';
import { loggedOutUser } from './UserProps';

import useFirebaseAuth from '../Hooks/useFirebaseAuth';
import useUserDocument from '../Hooks/useUserDocument';
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
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const [userAuth, refreshToken] = useFirebaseAuth(userDispatch, setIsLoggingIn);
  useUserDocument(user, userDispatch, userAuth, isLoggingIn, setIsLoggingIn);
  const usersRequestingVerify = useVerificationRequests(user);
  const verifiedResidents = useVerifiedResidents(user);

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
