import React, { useCallback, useState } from 'react';

import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';

import { UserCreationData } from '@app/types';

import { KU_EMAIL_REGEX } from '@app/constants';
import { useUser } from '@app/contexts/services/User';

import { FormikPasswordField, FormikSelectField, FormikTextField } from '../common/FormFields';

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
          roomNumber: Yup.number()
            .positive('Room number must be positive')
            .integer('Room number must be a whole number'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField name="email" label="KU Email" disabled={isLoading} required />
          <FormikPasswordField
            name="password"
            disabled={isLoading}
            strengthMeter
            visibilitySwitch
          />
          <FormikTextField
            name="displayName"
            label="Preferred Name"
            disabled={isLoading}
            required
          />
          <div className={classes.hallDetailsContainer}>
            <FormikSelectField
              className={classes.hallField}
              name="hall"
              label="Hall"
              options={halls}
              disabled={isLoading}
              required
            />
            <FormikTextField
              className={classes.roomNumberField}
              name="roomNumber"
              label="Room No."
              type="number"
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
