import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { firestore } from "firebase/app";

import { Formik, FastField, FormikHelpers } from "formik";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Subject from "./FeedbackInputs/Subject";
import Message from "./FeedbackInputs/Message";
import validationSchema from "./feedbackValidationSchema";

export type WebsiteFeedbackFormValues = { subject: string; message: string };

const formInitialValues = { subject: "", message: "" };
const firebaseErrorAlert = (
  <Alert variant="warning">
    Wuh woh, your feedback didn't go through! Don't worry, just submit some feedback about it and
    we-... oh right.
  </Alert>
);

type WebsiteFormProps = { feedbackCollection: firestore.CollectionReference };
const WebsiteForm: React.FC<WebsiteFormProps> = props => {
  const [firebaseError, setFirebaseError] = useState(false);
  const history = useHistory();

  const onSubmit = (
    feedback: WebsiteFeedbackFormValues,
    actions: FormikHelpers<WebsiteFeedbackFormValues>
  ): void => {
    props.feedbackCollection
      .add(feedback)
      .then(() => {
        history.push("/events", { update: "Feedback submitted! Thanks pal!", t: Date.now() });
      })
      .catch(error => {
        actions.setSubmitting(false);
        setFirebaseError(true);
        console.error(error);
      });
  };

  return (
    <>
      {firebaseError && firebaseErrorAlert}
      <Formik
        initialValues={formInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting }): React.ReactElement => (
          <Form noValidate onSubmit={handleSubmit}>
            <FastField name="subject" component={Subject} />
            <FastField name="message" component={Message} />
            <Row className="justify-content-center my-5">
              <Col xs={8}>
                <Button block variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                  Submit Feedback
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WebsiteForm;
