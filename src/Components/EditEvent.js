import React, { useContext } from "react";

import { EventsContext } from "../Contexts/EventsContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./EventForm";
import EventCreationFAQ from "./EventCreationFAQ";

const EditEvent = ({ match, history }) => {
  const { events, dispatchToEvents } = useContext(EventsContext);

  const event_id = match.params.id;

  const eventToEdit = events.find(event => event.id === event_id);

  const onSubmit = e => {
    e.preventDefault(); 

    dispatchToEvents({
      type: "EDIT",
      event: e.target.value,
      id: event_id
    })

    history.push("/events");
  }

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
          <h1>Create New Event</h1>
          <hr />
          <EventForm 
            onSubmit={onSubmit}
            event={{ ...eventToEdit, funding: undefined }} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
