import React, { useReducer, createContext, useEffect } from 'react';

import { auth } from '../Firebase/firebase';
import UserReducer from '../Reducers/User.Reducer';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  useEffect(() => auth.onAuthStateChanged((user) => {
    if(user) {
      userDispatch({ type: "LOGGED_IN", user })
    } else {
      userDispatch({ type: "LOGGED_OUT"})
    }
  }), []);
  


  return (
    <UserContext.Provider value={{user, userDispatch}}>
      {props.children}
    </UserContext.Provider>
  )
};