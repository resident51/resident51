import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { UserContext } from '../Contexts/User';
import { auth } from '../Firebase/firebase';

const Logout: React.FC = () => {
  const { user, userDispatch, isLoggingIn } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user.uid) {
      auth.signOut().then(() => {
        userDispatch({ type: 'LOGOUT' });
        history.push('/events', { update: 'Logged out successfully.', t: Date.now() });
      });
    } else if (!isLoggingIn) {
      history.replace('/login');
    }
  }, [user.uid, userDispatch, history, isLoggingIn]);

  return <div />;
};

export default Logout;
