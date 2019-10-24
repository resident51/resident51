import React, { useContext, useEffect } from 'react'

import { UserContext } from "../Contexts/UserContext";

import { firebase, ui } from '../Firebase/firebase';
import 'firebaseui/dist/firebaseui.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = ({ history }) => {
  const { user, userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (user && user.uid) {
      return history.replace('/profile');
    } else if(user === null) {
      return;
    }

    document.title = "Log in | Resident 51";

    const uiConfig = {
      'callbacks': {
        signInSuccessWithAuthResult: function (authResult) {
          if (authResult.additionalUserInfo && authResult.additionalUserInfo.isNewUser) {
            userDispatch({ type: "NEW_USER" });
          }
          history.push('/events');
          return false;
        },
        signInFailure: error => {
          history.push('/login', { error });
          return false;
        }
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      tosUrl: () => history.push('/terms-of-service'),
      privacyPolicyUrl: () => history.push('/privacy-policy'),
    };

    ui.start('#firebaseui-auth-container', uiConfig);
  }, [user, history, userDispatch]);

  return user === null ? <div /> :
    <Container fluid={true}>
      <Row>
        <Col className="text-center" xs={12}>
          <h1>Log in to Resident 51:</h1>
        </Col>
        <Col xs={12}>
          <div id="firebaseui-auth-container"></div>
        </Col>
      </Row>
    </Container>
    ;
}

export default Login