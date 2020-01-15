import React, { useContext, useEffect, useState } from "react";

import { verificationRequest } from "../Types/";

import { UserContext } from "../Contexts/User";

import { useHistory } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { requestVerification } from "../Firebase/firebase";

import FirstLoginForm from "./Auth/FirstLoginForm";

const requestErrorAlert = (
  <Col xs={12} md={8} className="justify-content-center my-3">
    <Alert variant="warning">
      There was an error with your request. It could be our fault, but more likely, it's entirely
      yours!
    </Alert>
  </Col>
);

const FirstLogin: React.FC = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [requestError, setRequestError] = useState(false);
  const [tokenIsRefreshed, setTokenIsRefreshed] = useState(false);

  const userPermissions = user && user.permissions;
  const userTokenCallback = user && user.getIdToken;
  useEffect(() => {
    // Waiting for user info from Firebase Auth - wait.
    if (user === null) return;

    if (typeof user.permissions !== "number") {
      // No user logged in, direct to /login
      history.replace("/login");
    } else if (user.permissions !== 0) {
      // User logged in, but already verified.
      history.replace("/profile");
    } else {
      user.getIdToken(true).then(() => setTokenIsRefreshed(true));
    }
  }, [history, user, userPermissions, userTokenCallback]);

  const onSubmit = async (request: verificationRequest): Promise<void> => {
    if (user) {
      // Refresh user token, in case they are requesting verification
      // immediately after signing in for the first time.
      // #TODO okay turns out I need to get the login token earlier.
      // can probably just be done in a useEffect call on mount.
      await user.getIdToken(true);

      // request verification
      const result = await requestVerification({
        displayName: request.name,
        kuEmail: request.email,
        requestedHall: request.hall
      });

      if (result.data) {
        // Refresh user id token bc it's fucking free hell yeah.
        await user.getIdToken(true);
        history.push("/events", {
          update: "Successfully requested verification!",
          t: Date.now()
        });
      } else {
        setRequestError(true);
      }
    }
  };

  const initialName = user && user.displayName ? user.displayName : "";

  return user === null ? (
    <div />
  ) : (
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
          {tokenIsRefreshed && <FirstLoginForm onSubmit={onSubmit} name={initialName} />}
        </Col>
        {requestError && requestErrorAlert}
      </Row>
    </Container>
  );
};

export default FirstLogin;
