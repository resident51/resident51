import React, { useContext, useEffect } from "react";

import { verificationRequest } from '../Types/';

import { UserContext } from '../Contexts/User';

import { useHistory } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { requestVerification } from '../Firebase/firebase';

import FirstLoginForm from './Auth/FirstLoginForm';

const FirstLogin = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    document.title = "First Log-in | Resident 51";

    // Waiting for user info from Firebase Auth - wait.
    if(user === null) return;

    if(typeof user.permissions !== 'number') {
      // No user logged in, direct to /login
      history.replace('/login');
    } else if(user.permissions !== 0) {
      // User logged in, but already verified.
      history.replace('/profile');
    }
  }, [history, user]);

  const onSubmit = async (request: verificationRequest) => {

    console.log('ok, we\'re here');
    console.log(user);

    // On success, also updates the user's doc in Firestore.
    if(user && user.getIdToken) {
      console.log('check that token')
      // Refresh user token, in case they are requesting verification
      // immediately after signing in for the first time.
      await user.getIdToken(true);

      console.log('lets request')

      // request verification
      requestVerification({
        displayName: request.name,
        kuEmail: request.email,
        requestedHall: request.hall,
      }).then(result => {
        if(result.data) {
          console.log('requested, maybe?');
          history.push("/events", { update: 'Successfully requested verification probably!'});
        } else {
          console.log('failure...');
        }
      });
    }
  }

  const initialName = (user && user.displayName) ? user.displayName : '';

  return user === null ? <div /> : (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="justify-content-center my-3">
          <h1 className="text-center">Welcome!</h1>
        </Col>
        <Col xs={12} md={8}>
          <p className="lead">
            Before you can use the cool parts of Resident 51, you'll need
            to be verified by an executive member of your hall. Fortunately,
            that's the easy part: just fill out the form below and you're good
            to go.
          </p>
        </Col>
        <Col xs={12} md={8}>
          <FirstLoginForm onSubmit={onSubmit} name={initialName} />
        </Col>
      </Row>
    </Container>
  );
};

export default FirstLogin;