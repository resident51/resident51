import React, { useState, useContext, useEffect } from 'react';

import { EventsContext } from '../Contexts/Events';
import { UserContext } from '../Contexts/User';
import usePrevious from '../Hooks/usePrevious';

import { useHistory, useParams } from 'react-router-dom';

import isEqual from 'lodash/isEqual';

import { FormikHelpers } from 'formik';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { eventsCollection } from '../Firebase/firebase';

import EventForm from './Events/EventForm';
import EventCreationFAQ from './Events/EventCreationFAQ';
import EventNotFound from './Events/EventNotFound';
import { EventForm as EventFormType } from '../Types/';

const EditEvent: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | Edit Event';
  }, []);
  const [eventUpdated, setEventUpdated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { events, formatSubmittedEvent } = useContext(EventsContext);
  const { user, isLoggingIn } = useContext(UserContext);

  const history = useHistory();
  const { id } = useParams();
  const eventToEdit = (events || []).find(e => '' + e.id === '' + id);

  // Inform the user if someone else just updated the same event.
  const initialEvent = usePrevious(eventToEdit);
  useEffect(() => {
    // If eventToEdit has changed, and it is not equal to its last value, someone updated it
    const eventDidUpdate = !!(initialEvent && !isEqual(eventToEdit, initialEvent));
    setEventUpdated(eventDidUpdate && !isSubmitting);
  }, [eventToEdit, initialEvent, events, isSubmitting]);

  useEffect(() => {
    if (!isLoggingIn && user.permissions < 2) {
      history.push('/events');
    }
  }, [user.permissions, history, isLoggingIn]);

  if (user.permissions < 2) return <div />;

  const onSubmit = (submittedEvent: EventFormType, actions: FormikHelpers<EventFormType>): void => {
    if (!eventToEdit) return;
    submittedEvent.id = id as string;
    const formattedEvent = formatSubmittedEvent(submittedEvent, {
      ...eventToEdit.submission,
      dateTime: new Date(eventToEdit.submission.dateTime),
    });

    setIsSubmitting(true);

    eventsCollection
      .doc(formattedEvent.id)
      .set(formattedEvent)
      .then(() => {
        history.push('/events', { update: 'Event updated!', t: Date.now() });
      })
      .catch(e => {
        setIsSubmitting(false);
        actions.setSubmitting(false);
        console.error(e);
      });
  };

  // Cases: 1) Waiting for firebase, 2) the event was found, 3) invalid event location
  const innerComponent =
    events === null ? (
      <h1>Loading event...</h1>
    ) : eventToEdit ? (
      <EventForm event={eventToEdit} onSubmit={onSubmit} eventUpdated={eventUpdated} />
    ) : (
      <EventNotFound />
    );

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          <h1>Edit This Event</h1>
          <hr />
          {innerComponent}
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
