import React, { useContext, useEffect } from "react";

import { UserContext } from "../Contexts/User";

import { useHistory } from "react-router-dom";

import { ui, GoogleAuthProvider, FacebookAuthProvider } from "../Firebase/firebase";
import "firebaseui/dist/firebaseui.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "Resident 51 | Log In";
  }, []);
  const { user, userDispatch } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (user && user.uid) {
      return history.replace("/profile");
    } else if (!user) {
      return;
    }

    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult): boolean {
          if (authResult.additionalUserInfo && authResult.additionalUserInfo.isNewUser) {
            userDispatch({ type: "NEW_USER" });
            history.push("/first-login");
          } else {
            history.push("/events");
          }
          return false;
        }
        // Not sure why this isn't successful?
        // signInFailure: error => {
        //   // TODO: handle errors gracefully
        //   // Actually do I even need that? I think it fails gracefully enough.
        //   history.push('/login', { error });
        //   return false;
        // }
      },
      signInFlow: "popup",
      signInOptions: [GoogleAuthProvider, FacebookAuthProvider],
      tosUrl: () => history.push("/terms-of-service"),
      privacyPolicyUrl: () => history.push("/privacy-policy")
    });
  }, [user, history, userDispatch]);

  if (user === null || user.uid) {
    return <div />;
  }

  return (
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
  );
};

export default Login;
