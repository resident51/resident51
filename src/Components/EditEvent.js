import React, { useState, useContext, useEffect } from "react";

import { EventsContext } from "../Contexts/Events";
import usePrevious from '../Hooks/usePrevious';

import isEqual from 'lodash/isEqual';
// import get from 'lodash/get';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./Events/EventForm";
import EventCreationFAQ from "./Events/EventCreationFAQ";
import EventNotFound from './Events/EventNotFound';

const EditEvent = ({ match, history }) => {
  useEffect(() => {
    document.title = "Edit Event | Resident 51";
  });
  
  const { events, dispatchToEvents, formatSubmittedEvent } = useContext(EventsContext);

  const id = match.params.id;
  const eventToEdit = (events || []).find(e => '' + e.id === '' + id);

  // Inform the user if someone else just updated the same event.
  const initialEvent = usePrevious(eventToEdit);
  const [eventUpdated, setEventUpdated] = useState(false);
  useEffect(() => {
    // If eventToEdit has changed, and it is not equal to its last value, someone updated it
    const eventDidUpdate = !!(initialEvent && !isEqual(eventToEdit, initialEvent));
    setEventUpdated(eventDidUpdate); // true || false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventToEdit, events]);

  const onSubmit = (submittedEvent) => {
    submittedEvent.id = id;
    formatSubmittedEvent(submittedEvent);
    dispatchToEvents({ type: 'MODIFY', event: submittedEvent });
    history.push("/events", { update: 'Event updated!' });
  }

  // Cases: 1) Waiting for firebase, 2) the event was found, 3) invalid event location
  const innerComponent = (events === null)
    ? <h1>Loading event...</h1>
    : ( eventToEdit ? <EventForm event={eventToEdit}
                                 onSubmit={onSubmit}
                                 eventUpdated={eventUpdated} />
                    : <EventNotFound /> );

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          <h1>Edit This Event</h1>
          <hr />
          {eventUpdated}
          {innerComponent}
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
