import React, { useCallback, useState } from 'react';

import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';

import { KU_EMAIL_REGEX } from '@app/constants';
import { sendPasswordResetEmail } from '@app/firebase/firebase';
import { useSnackbar } from '@app/contexts/ui/Snackbar';

import { FormikTextField } from '../common/FormFields';
import { LockQuestion as LockQuestionIcon } from '../common/Icons';

import AuthContentContainer from './AuthContentContainer';

interface ForgotPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Callback triggered when sign in link is clicked
   */
  onSignInRedirect: () => void;
  /**
   * Callback triggered when a closing action is taken
   */
  onClose: () => void;
}

const ForgotPassword: React.ForwardRefExoticComponent<ForgotPasswordProps> = React.forwardRef(
  (props, ref) => {
    const { onClose, onSignInRedirect, ...domProps } = props;
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const enqueueSnackbar = useSnackbar();

    const handleSubmit = useCallback(
      async values => {
        try {
          setLoading(true);
          await sendPasswordResetEmail(values);
          onClose();
          enqueueSnackbar(
            'If you have an account with that email, check your inbox for instructions',
            { variant: 'success' },
          );
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      },
      [onClose, enqueueSnackbar],
    );

    return (
      <AuthContentContainer
        {...domProps}
        error={error}
        header={{
          title: 'Forgot Password',
          icon: <LockQuestionIcon />,
          iconColor: 'secondary',
          subtitle:
            "Enter the email you use to sign in and we'll send you a link to reset your password",
        }}
        bottomText="Just remembered? Sign In"
        isLoading={isLoading}
        ref={ref}
        onClose={onClose}
        onBottomTextClick={onSignInRedirect}
      >
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .matches(KU_EMAIL_REGEX, 'Invalid KU email')
              .required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormikTextField name="email" label="Email" disabled={isLoading} required />
            <Button color="primary" variant="contained" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </Formik>
      </AuthContentContainer>
    );
  },
);

export default ForgotPassword;
