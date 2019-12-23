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
    console.log(user);

    if(user === null) {
      // Waiting for user info from Firebase Auth - wait.
      console.log('Okay I mean... okay whatever.')
      return;
    } else if(typeof user.permissions !== 'number') {
      // No user logged in, direct to /login
      // console.log('Again - you\'re a rat bastard, but whatever.');
      return history.replace('/login');
    } else if(user.permissions !== 0) {
      // User logged in, but already verified.
      return history.replace('/profile');
    }
  }, [history, user]);

  const onSubmit = (request: verificationRequest) => {
    // On success, also updates the user's doc in Firestore.
    requestVerification({
      displayName: request.name,
      kuEmail: request.email,
      requestedHall: request.hall
    });
  }

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
          <FirstLoginForm onSubmit={onSubmit} name={'GREG KNOLE'} />
        </Col>
      </Row>
    </Container>
  );
};

export default FirstLogin;