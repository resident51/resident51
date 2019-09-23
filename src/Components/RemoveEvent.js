import React, { useContext } from "react";

import { EventsContext } from "../Contexts/EventsContext";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventList from './EventComponents/EventList';
import EventCreationFAQ from "./EventCreationFAQ";

const RemoveEvent = ({ match, history }) => {
  const { events, dispatchToEvents } = useContext(EventsContext);

  // If the first navigation is to the edit form, show "loading event"
  if (events === null) {
    return (
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col className="HomeCard margin-bottom" sm={12} md={4}>
            <EventCreationFAQ />
          </Col>
          <Col className="HomeCard margin-bottom" sm={12} md={7}>
            <h1>Loading event...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const eventId = match.params.id;
  const eventToRemove = events.find(event => '' + event.id === '' + eventId);

  const handleClick = () => {
    dispatchToEvents({ type: 'REMOVE', eventId });
    history.push("/events", { update: 'Event removed.' });
  }

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
          <h1>Delete this event?</h1>
          <EventList events={[eventToRemove]} />
          <Button onClick={handleClick} variant="danger">Delete Event</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveEvent;