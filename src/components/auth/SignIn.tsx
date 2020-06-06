import React, { useCallback, useState } from 'react';

import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { LockOutlined as LockIcon } from '@material-ui/icons';

import { KU_EMAIL_REGEX } from '@app/constants';
import { useUser } from '@app/contexts/services/User';

import Link from '../common/Link';
import { FormikPasswordField, FormikTextField } from '../common/FormFields';

import AuthContentContainer from './AuthContentContainer';

import useStyles from './_jss/SignIn.jss';

interface SignInProps {
  /**
   * Callback triggered when a closing action is taken
   */
  onClose: () => void;
  /**
   * Callback triggered when the link to create an account is clicked
   */
  onSignUpRedirect: () => void;
  /**
   * Callback triggered when the forgot password link is clicked
   */
  onForgotPassword: () => void;
}

const SignIn: React.ForwardRefExoticComponent<SignInProps> = React.forwardRef((props, ref) => {
  const { onClose, onSignUpRedirect, onForgotPassword } = props;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const classes = useStyles();
  const { signIn } = useUser();

  const handleLoginClick = useCallback(
    async values => {
      setLoading(true);
      try {
        await signIn(values.email, values.password);
        onClose();
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    },
    [onClose, signIn],
  );

  return (
    <AuthContentContainer
      header={{
        title: 'Sign In',
        icon: <LockIcon />,
        iconColor: 'secondary',
        subtitle: 'Sign in using your KU email',
      }}
      bottomText="Create an account"
      error={error}
      onClose={onClose}
      onBottomTextClick={onSignUpRedirect}
      isLoading={isLoading}
      ref={ref}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .matches(KU_EMAIL_REGEX, 'Invalid KU email')
            .required('Required'),
          password: Yup.string()
            .max(100, 'Password is too long')
            .required('Required'),
        })}
        onSubmit={handleLoginClick}
      >
        <Form>
          <FormikTextField label="Email" name="email" disabled={isLoading} required />
          <FormikPasswordField name="password" disabled={isLoading} visibilitySwitch />
          <Button color="primary" variant="contained" type="submit" disabled={isLoading}>
            Sign In
          </Button>
        </Form>
      </Formik>
      <Link
        className={classes.forgotPassword}
        component="span"
        onClick={onForgotPassword}
        disabled={isLoading}
      >
        Forgot Password
      </Link>
    </AuthContentContainer>
  );
});

export default SignIn;
