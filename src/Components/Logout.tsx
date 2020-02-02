import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { UserContext } from '../Contexts/User';
import { auth } from '../Firebase/firebase';

const Logout: React.FC = () => {
  const { user, userDispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user && user.uid) {
      auth.signOut();
      userDispatch({ type: 'LOGOUT' });
      history.push('/events', { update: 'Logged out successfully.', t: Date.now() });
    } else if (user !== null) {
      history.replace('/login');
    }
  }, [user, userDispatch, history]);

  return <div />;
};

export default Logout;
