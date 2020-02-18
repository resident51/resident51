import React, { useReducer, useState, createContext } from 'react';

import { User, VisibleUser } from '../Types/';

import UserReducer, { UserAction } from '../Reducers/User.Reducer';
import { loggedOutUser } from './UserProps';

import useFirebaseAuth from '../Hooks/useFirebaseAuth';
import useUserDocument from '../Hooks/useUserDocument';
import useVerificationRequests from '../Hooks/useVerificationRequests';

interface UserContextProps {
  user: User;
  userDispatch: React.Dispatch<UserAction>;
  isLoggingIn: boolean;
  setIsLoggingIn: (next: boolean) => void;
  usersRequestingVerify: VisibleUser[];
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider: React.FC = props => {
  const [user, userDispatch] = useReducer(UserReducer, loggedOutUser);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const userAuth = useFirebaseAuth(userDispatch, setIsLoggingIn);
  useUserDocument(user, userDispatch, userAuth, isLoggingIn, setIsLoggingIn);
  const usersRequestingVerify = useVerificationRequests(user);

  return (
    <UserContext.Provider
      value={{ user, isLoggingIn, setIsLoggingIn, userDispatch, usersRequestingVerify }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
