import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CreateEventForm from "./CreateEventComponents/CreateEventForm"
import EventCreationFAQ from './CreateEventComponents/EventCreationFAQ';

const CreateEvent = () => (
  <Container fluid={true}>
    <Row className="justify-content-md-center">
      <Col className="HomeCard margin-bottom" sm={12} md={4}>
        <EventCreationFAQ />
      </Col>
      <Col className="HomeCard margin-bottom" sm={12} md={7}>
        <h2>Create New Event</h2>
        <CreateEventForm />
      </Col>
    </Row>
  </Container>
)

export default CreateEvent;