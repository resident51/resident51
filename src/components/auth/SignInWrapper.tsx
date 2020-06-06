import React, { useCallback, useState } from 'react';

import clsx from 'clsx';

import ForgotPassword from './ForgotPassword';
import SignIn from './SignIn';

import useStyles from './_jss/SignInWrapper.jss';

interface SignInWrapperProps {
  /**
   * Callback triggered when a closing action is taken
   */
  onClose: () => void;
  /**
   * Callback triggered when the link to create an account is clicked
   */
  onSignUpRedirect: () => void;
}

const SignInWrapper: React.FC<SignInWrapperProps> = props => {
  const { onClose, onSignUpRedirect } = props;
  const [fpVisible, setFpVisible] = useState(false);
  const classes = useStyles();

  const openForgotPassword = useCallback((): void => {
    setFpVisible(true);
  }, []);

  const closeForgotPassword = useCallback((): void => {
    setFpVisible(false);
  }, []);

  return (
    <div className={classes.signInWrapperRoot}>
      <SignIn
        onClose={onClose}
        onSignUpRedirect={onSignUpRedirect}
        onForgotPassword={openForgotPassword}
      />
      <ForgotPassword
        className={clsx(
          classes.forgotPassword,
          fpVisible ? classes.forgotPasswordVisible : classes.forgotPasswordHidden,
        )}
        onClose={onClose}
        onSignInRedirect={closeForgotPassword}
      />
    </div>
  );
};

export default SignInWrapper;
