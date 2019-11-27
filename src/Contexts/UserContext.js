import React, { useReducer, createContext, useEffect, useState } from 'react';

import { auth, usersCollection } from '../Firebase/firebase';
import UserReducer from '../Reducers/User.Reducer';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, userDispatch] = useReducer(UserReducer, null);
  const [userQuery, setUserQuery] = useState(null);

  // Check for auth token on client, use to sign user in
  useEffect(() => auth.onAuthStateChanged((user) => {
    if(user) {
      userDispatch({ type: "LOGGED_IN", user });

      // When user is signed in, create the user query that reference's
      //  the associated Firestore user document
      setUserQuery(usersCollection.doc(user.uid));
    } else {
      userDispatch({ type: "LOGGED_OUT"});
      // setUserQuery(usersCollection.doc(user.uid));
    }
  }), []);

  // When the Firestore user document is found, set extra permissions/info
  // on the user context.
  useEffect(() => userQuery ?
    userQuery.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const R51User = snapshot.data();
        console.log(R51User);
        userDispatch({ type: "USER_FOUND", R51User });
      } else {
        // Invalid reference to user document.
        if (user.uid) {
          // User probably exists, unless user being tom-foolerous
          // Dispatch as if user does not exist yet
          userDispatch({ type: "NEW_USER" });
        } else {
          // User is logged out, whoopsie!
          console.log(91);
        }
      }
    }) : () => {}, [userQuery]);

  return (
    <UserContext.Provider value={{user, userDispatch}}>
      {props.children}
    </UserContext.Provider>
  )
};
