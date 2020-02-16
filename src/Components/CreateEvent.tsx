import React, { useContext, useEffect } from 'react';

import { EventForm as EventFormType, Admin, Editor } from '../Types/';

import { firestore } from 'firebase/app';

import { EventsContext } from '../Contexts/Events';
import { UserContext } from '../Contexts/User';

import { useHistory } from 'react-router-dom';

import { FormikHelpers } from 'formik';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { eventsCollection } from '../Firebase/firebase';
import useDocumentTitle from '../Hooks/useDocumentTitle';

import EventForm from './Events/EventForm';
import EventCreationFAQ from './Events/EventCreationFAQ';

const CreateEvent: React.FC = () => {
  useDocumentTitle('Resident 51 | Create Event');
  const { formatSubmittedEvent } = useContext(EventsContext);
  const { user, isLoggingIn } = useContext(UserContext);

  const history = useHistory();

  // For now, only let editors and admins create events. Residents can submit later.
  // #TODO let residents request events be created.
  useEffect(() => {
    if (!isLoggingIn && user.permissions < 2) {
      history.push('/events');
    }
  }, [user.permissions, history, isLoggingIn]);

  // After event is validated, dispatch the event to firebase and redirect to the events page.
  const onSubmit = (event: EventFormType, actions: FormikHelpers<EventFormType>): void => {
    // #TODO let residents request events be created.
    if (!user.uid || user.permissions < 2) return;

    const formattedEvent = formatSubmittedEvent(event, {
      userId: user.uid,
      displayName: user.displayName,
      hall: (user as Editor | Admin).hall,
      dateTime: firestore.FieldValue.serverTimestamp(),
    });

    eventsCollection
      .add(formattedEvent)
      .then(() => history.push('/events', { update: 'Event created!', t: Date.now() }))
      .catch(e => {
        actions.setSubmitting(false);
        console.error(e);
      });
  };

  if (user.permissions < 2) return <div />;

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          <h1>Create New Event</h1>
          <hr />
          <EventForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
