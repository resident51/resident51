import React, { useState, useContext } from 'react';

import { UserContext } from '../../Contexts/User';

import { useHistory } from 'react-router-dom';

import { firestore } from 'firebase/app';

import { Formik, FastField, FormikHelpers } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Subject from './FeedbackInputs/Subject';
import Message from './FeedbackInputs/Message';
import PromptIfDirty from '../Common/PromptIfDirty';
import validationSchema from './feedbackValidationSchema';

export type WebsiteFeedback = { subject: string; message: string };

const firebaseErrorAlert = (
  <Alert variant="warning">
    Wuh woh, your feedback didn't go through! Don't worry, just submit some feedback about it and
    we-... oh right.
  </Alert>
);

const unauthenticatedErrorAlert = (
  <Alert variant="warning">
    Hey! We appreciate your enthusiasm, but you gotta be logged in to submit feedback!
  </Alert>
);

const formInitialValues = { subject: '', message: '' };

type WebsiteFormProps = { feedbackCollection: firestore.CollectionReference };
const WebsiteForm: React.FC<WebsiteFormProps> = props => {
  const [firebaseError, setFirebaseError] = useState(false);
  const [unauthenticated, setUnauthenticated] = useState(false);
  const { user } = useContext(UserContext);

  const history = useHistory();

  const onSubmit = (feedback: WebsiteFeedback, actions: FormikHelpers<WebsiteFeedback>): void => {
    const creation = firestore.FieldValue.serverTimestamp();
    console.log(user);
    if (!user || !user.displayName) {
      // Direct user to log in.
      setUnauthenticated(true);
      props.feedbackCollection.add({ ...feedback, creation, user: 'Unauthenticated' });
      return;
    }

    const { uid, displayName, email } = user;
    props.feedbackCollection
      .add({ ...feedback, creation, user: { uid, displayName, email } })
      .then(() => {
        history.push('/events', { update: 'Feedback submitted! Thanks pal!', t: Date.now() });
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
      {unauthenticated && unauthenticatedErrorAlert}
      <Formik
        initialValues={formInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting }): React.ReactElement => (
          <Form noValidate onSubmit={handleSubmit}>
            <PromptIfDirty />
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
