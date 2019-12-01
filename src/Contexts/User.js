import React, { useReducer, createContext, useEffect, useState } from 'react';

import { auth, usersCollection } from '../Firebase/firebase';
import UserReducer from '../Reducers/User.Reducer';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  // Reference to user's document in Cloud Firestore.
  const [userQuery, setUserQuery] = useState(null);

  // Check for auth token on client, use to sign user in
  useEffect(() => auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      userDispatch({ type: "LOGGED_IN", authUser });
      setUserQuery(usersCollection.doc(authUser.uid));
    } else {
      userDispatch({ type: "LOGGED_OUT" });
      setUserQuery(null);
    }
  }), []);

  // When the Firestore user document is found, set extra permissions/info
  // on the user context.
  useEffect(() => !userQuery ? undefined : userQuery.onSnapshot(snapshot => {
    if (snapshot.exists) {
      const R51User = snapshot.data();
      userDispatch({ type: "USER_FOUND", R51User });
    }
  }), [userQuery]);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  )
};
