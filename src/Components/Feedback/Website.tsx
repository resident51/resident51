import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { firestore } from "firebase";

import { Formik, FastField } from "formik";
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
    Bad news bears: Your feedback didn't go through! Don't worry, just submit some feedback about it
    and we-... oh right.
  </Alert>
);

type WebsiteFormProps = { feedbackCollection: firestore.CollectionReference };
const WebsiteForm: React.FC<WebsiteFormProps> = props => {
  const [firebaseError, setFirebaseError] = useState(false);
  const history = useHistory();

  const onSubmit = (feedback: WebsiteFeedbackFormValues): void => {
    props.feedbackCollection
      .add(feedback)
      .then(() => {
        history.push("/events", { update: "Feedback submitted! Thanks pal!" });
      })
      .catch(() => {
        setFirebaseError(true);
      });
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }): React.ReactElement => (
        <>
          {firebaseError && firebaseErrorAlert}
          <Form noValidate onSubmit={handleSubmit}>
            {/* <h3 className="mt-3 mb-2 text-center">Subject</h3> */}
            <FastField name="subject" component={Subject} />

            {/* <h3 className="my-2 text-center">Message</h3> */}
            <FastField name="message" component={Message} />

            <Row className="justify-content-center my-5">
              <Col xs={8}>
                <Button block variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                  Submit Feedback
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default WebsiteForm;
