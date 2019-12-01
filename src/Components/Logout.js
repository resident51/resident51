import React, { useContext, useEffect } from 'react'

import { UserContext } from "../Contexts/User";

const Logout = ({ history }) => {
  const { user, userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (user && user.uid) {
      userDispatch({ type: 'LOGOUT' })
      history.push("/events", { update: 'Logged out successfully.' });
    } else if (user !== null) {
      history.replace('/login');
    }
  }, [user, userDispatch, history]);

  return <div />;
}

export default Logout




