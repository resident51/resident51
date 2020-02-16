import React, { useReducer, useState, useEffect, createContext } from 'react';

import { User, UserDocument, VisibleUser, ConfirmedVerificationRequest } from '../Types/';

import { auth, usersCollection } from '../Firebase/firebase';
import UserReducer, { UserAction } from '../Reducers/User.Reducer';

import { loggedOutUser } from './UserProps';

interface UserContextProps {
  user: User;
  isLoggingIn: boolean;
  setIsLoggingIn: (next: boolean) => void;
  userDispatch: React.Dispatch<UserAction>;
  usersRequestingVerify: VisibleUser[];
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider: React.FC = props => {
  const [user, userDispatch] = useReducer(UserReducer, loggedOutUser);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [verifyRequests, setVerifyRequests] = useState<firebase.firestore.Query | null>(null);
  const [usersRequestingVerify, setUsersRequestingVerify] = useState<VisibleUser[]>([]);

  // Check for auth token on client, use to sign user in.
  useEffect(
    () =>
      auth.onIdTokenChanged(authUserSnapshot => {
        if (authUserSnapshot && !userAuth) {
          userDispatch({ type: 'LOGGED_IN', data: authUserSnapshot });
          setUserAuth(authUserSnapshot);
        } else if (authUserSnapshot === null) {
          userDispatch({ type: 'LOGGED_OUT' });
          setVerifyRequests(null);
          setUsersRequestingVerify([]);
          setUserAuth(null);
          setIsLoggingIn(false);
        }
      }),
    [userAuth],
  );

  // When the Firestore user document is found, set extra permissions/info
  // on the user context.
  useEffect(() => {
    if (!user.uid || userAuth === null) return;

    return usersCollection.doc(user.uid).onSnapshot(snapshot => {
      if (snapshot.exists) {
        const doc = snapshot.data() as UserDocument;
        userDispatch({ type: 'USER_FOUND', data: doc });
        // If user is an admin, set reference query for users requesting verification.
        const { hall, permissions } = user;
        if (isLoggingIn || hall !== doc.hall || permissions !== doc.permissions) {
          userAuth.getIdToken(true);
        }
        if (permissions >= 3) {
          const query = usersCollection.where('hall', '==', hall).where('permissions', '==', 0);
          setVerifyRequests(query);
          return;
        }
        setIsLoggingIn(false);
      }
      setVerifyRequests(null);
    });
  }, [userAuth, user, isLoggingIn]);

  // When the query for users requesting verification is set, we can try to send the query to Firebase.
  // So long as the user isn't being nefarious, and so long as there are users requesting verification,
  // we will get the list of users requesting verification from firebase.
  useEffect(() => {
    if (verifyRequests !== null) {
      return verifyRequests.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const userData = change.doc.data() as ConfirmedVerificationRequest;
          const userRequesting = { ...userData, uid: change.doc.id };
          if (change.type === 'added') {
            setUsersRequestingVerify(last => [...last, userRequesting]);
          } else if (change.type === 'modified') {
            setUsersRequestingVerify(last =>
              last.map(userRow => (userRow.uid === change.doc.id ? userRequesting : userRow)),
            );
          } else {
            setUsersRequestingVerify(last => last.filter(userRow => userRow.uid !== change.doc.id));
          }
        });
      });
    }
  }, [verifyRequests]);

  return (
    <UserContext.Provider
      value={{ user, isLoggingIn, setIsLoggingIn, userDispatch, usersRequestingVerify }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
