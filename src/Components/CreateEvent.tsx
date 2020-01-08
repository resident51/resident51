import React, { useContext, useCallback } from "react";

import { EventForm as EventFormType } from "../Types/";

import { EventsContext } from "../Contexts/Events";

import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./Events/EventForm";
import EventCreationFAQ from "./Events/EventCreationFAQ";

const CreateEvent: React.FC = () => {
  const history = useHistory();

  const { dispatchToEvents, formatSubmittedEvent } = useContext(EventsContext);

  // After event is validated, dispatch the event to firebase and redirect to
  // the events page.
  const onSubmit = useCallback(
    (event: EventFormType) => {
      const eventToDispatch = formatSubmittedEvent(event);
      // (jfc this works but it's horrendous practice)
      // #TODO use a useFirebase hook, then wait for success from firebase before redirect
      dispatchToEvents({ type: "ADD", event: eventToDispatch });
      history.push("/events", { update: "Event created!" });
    },
    [formatSubmittedEvent, dispatchToEvents, history]
  );

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
