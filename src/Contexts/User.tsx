import React, { useReducer, createContext, useMemo } from 'react';

import { User, FetchedUser } from '../Types/';

import UserReducer, { UserAction } from '../Reducers/User.Reducer';
import { loggedOutUser } from './UserProps';

import { usersCollection } from '../Firebase/firebase';

import useFirebaseAuth from '../Hooks/useFirebaseAuth';
import useUserCollection from '../Hooks/useUserCollection';

interface UserContextProps {
  user: User;
  refreshToken: () => Promise<string>;
  userDispatch: React.Dispatch<UserAction>;
  isLoggingIn: boolean;
  setIsLoggingIn: (next: boolean) => void;
  usersRequestingVerify: FetchedUser[];
  verifiedResidents: FetchedUser[];
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider: React.FC = props => {
  const [user, userDispatch] = useReducer(UserReducer, loggedOutUser);
  const [userAuth, loginState] = useFirebaseAuth(user, userDispatch);

  // Need memoized queries, as firebase creates new values even if two queries are identical
  const baseQuery = useMemo(() => usersCollection.where('hall', '==', user.hall), [user]);
  const requestingUsersQuery = useMemo(() => baseQuery.where('permissions', '==', 0), [baseQuery]);
  const verifiedUsersQuery = useMemo(() => baseQuery.where('permissions', '>=', 1), [baseQuery]);

  const usersRequestingVerify = useUserCollection(user, requestingUsersQuery);
  const verifiedResidents = useUserCollection(user, verifiedUsersQuery);

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
