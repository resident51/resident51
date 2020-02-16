import React, { useContext, useEffect, useState } from 'react';

import { VerificationRequest } from '../Types/';

import { UserContext } from '../Contexts/User';

import { useHistory } from 'react-router-dom';

import { FormikHelpers } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { requestVerification } from '../Firebase/firebase';

import FirstLoginForm from './Auth/FirstLoginForm';

const requestErrorAlert = (
  <Col xs={12} md={8} className="justify-content-center my-3">
    <Alert variant="warning">
      There was an error with your request. It could be our fault, but more likely, it's entirely
      yours!
    </Alert>
  </Col>
);

const FirstLogin: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | First Login';
  }, []);
  const [requestError, setRequestError] = useState(false);
  const { user, isLoggingIn } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    console.log('howdy!');
    console.log(user);
    if (isLoggingIn) return;
    if (user.uid === null) {
      history.replace('/login');
    } else if (user.kuEmail) {
      // User logged in, but already requested verification.
      history.replace('/profile');
    }
  }, [history, user, isLoggingIn]);

  if (user.uid === null || typeof user.kuEmail === 'string') return <div />;

  const onSubmit = async (
    request: VerificationRequest,
    actions: FormikHelpers<VerificationRequest>,
  ): Promise<void> => {
    const result = await requestVerification({
      displayName: request.name,
      kuEmail: request.email,
      requestedHall: request.hall,
    });

    if (result.data) {
      history.push('/events', {
        update: 'Successfully requested verification!',
        t: Date.now(),
      });
      return;
    }
    setRequestError(true);
    actions.setSubmitting(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={11} sm={9} className="justify-content-center my-3">
          <h1 className="text-center">Welcome!</h1>
        </Col>
        {requestError && requestErrorAlert}
        <Col xs={11} sm={9}>
          <p className="lead">
            Before you can use the cool parts of Resident 51, you'll need to be verified by an
            executive member of your hall. Fortunately, that's the easy part: just fill out the form
            below and you're good to go.
          </p>
        </Col>
        <Col xs={12} sm={9}>
          {user.displayName && <FirstLoginForm onSubmit={onSubmit} name={user.displayName} />}
        </Col>
        {requestError && requestErrorAlert}
      </Row>
    </Container>
  );
};

export default FirstLogin;
