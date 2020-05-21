import React, { useContext, useEffect } from 'react';

import { UserContext } from '../Contexts/User';

import useDocumentTitle from '../Hooks/useDocumentTitle';

import { useHistory } from 'react-router-dom';

import { ui, GoogleAuthProvider, FacebookAuthProvider, logError } from '../Firebase/firebase';
import 'firebaseui/dist/firebaseui.css';

const Login: React.FC = () => {
  useDocumentTitle('Log In');
  const { user, userDispatch, isLoggingIn, setIsLoggingIn } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (isLoggingIn) return;

    if (user.uid) return history.replace('/profile');

    ui.start('#firebaseui-auth-container', {
      signInFlow: 'popup',
      signInOptions: [GoogleAuthProvider, FacebookAuthProvider],
      tosUrl: () => history.push('/terms-of-service'),
      privacyPolicyUrl: () => history.push('/privacy-policy'),
      callbacks: {
        signInSuccessWithAuthResult: function(authResult): boolean {
          if (authResult.additionalUserInfo && authResult.additionalUserInfo.isNewUser) {
            setIsLoggingIn(true);
            history.push('/first-login');
          } else {
            history.push('/events');
          }
          return false;
        },
        signInFailure: async (): Promise<void> => {
          history.push('/events', { update: 'Login failed? Hm.', t: Date.now() });
          await logError(`Error in sign in. User: ${JSON.stringify(user)}`);
          return;
        },
      },
    });
  }, [user, history, userDispatch, isLoggingIn, setIsLoggingIn]);

  if (isLoggingIn || user.uid) {
    return <div />;
  }

  return (
    <div>
      <h1>Log In or Create an Account:</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Login;
