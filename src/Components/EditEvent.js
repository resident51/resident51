import React, { useState, useContext, useEffect } from "react";

import { EventsContext } from "../Contexts/EventsContext";
import usePrevious from '../Hooks/usePrevious';

import isEqual from 'lodash/isEqual';
// import get from 'lodash/get';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./EventForm";
import EventCreationFAQ from "./EventComponents/EventCreationFAQ";
import EventNotFound from './EventComponents/EventNotFound';

const EditEvent = ({ match, history }) => {
  const { events, dispatchToEvents, formatEventDate } = useContext(EventsContext);

  const id = match.params.id;
  const eventToEdit = (events || []).find(e => '' + e.id === '' + id);

  // Inform the user if someone else just updated the same event.
  const initialEvent = usePrevious(eventToEdit);
  const [eventUpdated, setEventUpdated] = useState(false);
  useEffect(() => {
    // If eventToEdit has changed, and it is not equal to its last value, someone updated it
    const eventDidUpdate = !!(initialEvent && !isEqual(eventToEdit, initialEvent));
    setEventUpdated(eventDidUpdate); // true || false
  }, [eventToEdit, events]);

  const onSubmit = (submittedEvent) => {
    submittedEvent.id = id;
    formatEventDate(submittedEvent);
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
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
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
