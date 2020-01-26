import React, { useContext, useEffect, useState } from "react";

import { VerificationRequest } from "../Types/";

import { UserContext } from "../Contexts/User";

import { useHistory } from "react-router-dom";

import { FormikHelpers } from "formik";

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
  useEffect(() => {
    document.title = "Resident 51 | First Login";
  }, []);
  const [requestError, setRequestError] = useState(false);
  const [tokenIsRefreshed, setTokenIsRefreshed] = useState(false);
  const { user } = useContext(UserContext);

  const history = useHistory();

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

  const onSubmit = async (
    request: VerificationRequest,
    actions: FormikHelpers<VerificationRequest>
  ): Promise<void> => {
    if (user) {
      // Refresh token to ensure custom claims are set.
      await user.getIdToken(true);

      // Request verification
      const requestData = {
        displayName: request.name,
        kuEmail: request.email,
        requestedHall: request.hall
      };

      const result = await requestVerification(requestData);

      if (result.data) {
        await user.getIdToken(true);
        history.push("/events", {
          update: "Successfully requested verification!",
          t: Date.now()
        });
        return;
      } else {
        setRequestError(true);
      }
    }
    actions.setSubmitting(false);
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
