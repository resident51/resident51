import React, { useState, useReducer, createContext, useEffect } from 'react';

import { auth } from '../Firebase/firebase';
import UserReducer from '../Reducers/User.Reducer';

export const UserContext = createContext();

export const EventsProvider = props => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  auth.onAuthStateChanged((user) => {
    console.log('yoooo!')
    console.log(user);
    if (user) dispatchToEvents({ type: 'LOGIN', user })
    else dispatchToEvents({ type: 'LOGIN' })
  });

  return (
    <UserContext.Provider value={{user, userDispatch}}>
      {props.children}
    </UserContext.Provider>
  )
};