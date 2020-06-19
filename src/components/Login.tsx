import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import 'firebaseui/dist/firebaseui.css';

import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { FacebookAuthProvider, GoogleAuthProvider, logError, ui } from '@app/firebase/firebase';
import { UserContext } from '@app/contexts/User';

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
