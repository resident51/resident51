import PropTypes, { InferProps } from 'prop-types';
import React, { useCallback, useState } from 'react';

import * as Yup from 'yup';
import clsx from 'clsx';
import { Avatar, Button, Divider, IconButton, Typography } from '@material-ui/core';
import { Close as CloseIcon, LockOutlined as LockIcon } from '@material-ui/icons';
import { Form, Formik } from 'formik';

import { ReactComponent as FacebookLogo } from '../../resources/img/facebook-logo.svg';
import { FormikTextField } from '../common/FormFields';
import { ReactComponent as GoogleLogo } from '../../resources/img/google-logo.svg';

import useStyles from './Login.jss';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginProps = {
  onClose: PropTypes.func.isRequired,
  setLoadingIndicator: PropTypes.func,
};

const Login: React.FC<InferProps<typeof LoginProps>> = props => {
  const onClose: () => void = props.onClose;
  const setLoadingIndicator: ((value: boolean) => void) | null | undefined =
    props.setLoadingIndicator;
  const [disabled, setDisabled] = useState<boolean>(false);
  const classes = useStyles();

  const handleLoginClick = useCallback(
    values => {
      console.log(values);
      setLoadingIndicator?.(true);
      setDisabled(true);
    },
    [setLoadingIndicator],
  );

  return (
    <div className={classes.loginRoot}>
      <IconButton className={classes.closeButton} onClick={onClose} disabled={disabled}>
        <CloseIcon />
      </IconButton>
      <div className={classes.loginContainer}>
        <div className={classes.loginHeader}>
          <Avatar className={clsx(classes.loginIcon)}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Login
          </Typography>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .max(25, 'Password is too long')
              .required('Required'),
          })}
          onSubmit={handleLoginClick}
        >
          <Form className={classes.loginForm}>
            <FormikTextField label="Email" name="email" disabled={disabled} required />
            <FormikTextField label="Password" name="password" disabled={disabled} required />
            <Button
              className={classes.loginButton}
              color="primary"
              variant="contained"
              type="submit"
              disabled={disabled}
            >
              Login
            </Button>
          </Form>
        </Formik>
        <Divider variant="middle" flexItem />
        <div className={classes.federatedProviderContainer}>
          <Button
            className={`${classes.federatedProviderButton} ${classes.googleButton}`}
            variant="contained"
            startIcon={<GoogleLogo />}
            disabled={disabled}
          >
            Login with Google
          </Button>
          <Button
            className={`${classes.federatedProviderButton} ${classes.facebookButton}`}
            variant="contained"
            color="primary"
            startIcon={<FacebookLogo />}
            disabled={disabled}
          >
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
