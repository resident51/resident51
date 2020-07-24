import React, { useCallback, useState } from 'react';

import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';

import { UserCreationData } from '@app/types';

import { KU_EMAIL_REGEX } from '@app/constants';
import { useUser } from '@app/contexts/services/User';

import PasswordField from '../common/form/PasswordField';
import SelectField from '../common/form/SelectField';
import TextField from '../common/form/TextField';

import AuthContentContainer from './AuthContentContainer';

import useStyles from './_jss/SignUp.jss';

interface SignUpProps {
  /**
   * Callback triggered when a closng action is taken
   */
  onClose: () => void;
  /**
   * Callback triggered when the link to sign in is clicked
   */
  onSignInRedirect: () => void;
}

const SignUp = React.forwardRef<unknown, SignUpProps>((props, ref) => {
  const { onClose, onSignInRedirect } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const { signUp } = useUser();
  const halls = [
    'Battenfeld',
    'Douthart',
    'Grace Pearson',
    'KK Amini',
    'Krehbiel',
    'Margaret Amini',
    'Miller',
    'Pearson',
    'Rieger',
    'Sellards',
    'Stephenson',
    'Watkins',
  ];

  const handleSubmit = useCallback(
    async (data: UserCreationData) => {
      setLoading(true);
      try {
        await signUp(data);
        onClose();
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    },
    [onClose, signUp],
  );

  return (
    <AuthContentContainer
      className={classes.signUpContainer}
      error={error}
      header={{
        title: 'Sign Up',
        icon: <PersonAddIcon />,
        subtitle: 'Sign up using your KU email account',
      }}
      bottomText="Already have an account? Sign In"
      isLoading={isLoading}
      onClose={onClose}
      onBottomTextClick={onSignInRedirect}
      ref={ref}
    >
      <Formik
        initialValues={
          {
            email: '',
            password: '',
            displayName: '',
            hall: '',
            roomNumber: undefined,
          } as UserCreationData
        }
        validationSchema={Yup.object({
          email: Yup.string()
            .matches(KU_EMAIL_REGEX, 'Invalid KU email')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Required'),
          displayName: Yup.string().required('Required'),
          hall: Yup.string().required('Required'),
          roomNumber: Yup.string().matches(/^[0-9]{1,3}[a-zA-Z]?$/, 'Invalid room number'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="email" label="KU Email" disabled={isLoading} required />
          <PasswordField name="password" disabled={isLoading} strengthMeter visibilitySwitch />
          <TextField name="displayName" label="Preferred Name" disabled={isLoading} required />
          <div className={classes.hallDetailsContainer}>
            <SelectField
              className={classes.hallField}
              name="hall"
              label="Hall"
              options={halls}
              disabled={isLoading}
              required
            />
            <TextField
              className={classes.roomNumberField}
              name="roomNumber"
              label="Room No."
              disabled={isLoading}
            />
          </div>
          <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
            Create Account
          </Button>
        </Form>
      </Formik>
    </AuthContentContainer>
  );
});

export default SignUp;
