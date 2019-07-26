import React, { useContext } from 'react';

import { EventTypesContext } from "../Contexts/EventTypesContext";

// import Formik from 'formik';
// import yup from 'yup';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Accordion, { useAccordionToggle } from 'react-bootstrap/Accordion';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import PickLocation from './CreateEventComponents/PickLocation';
import EventCreationFAQ from './CreateEventComponents/EventCreationFAQ';
// import R51Card from "./R51Card";

const CreateEvent = props => {

  const { eventTypes } = useContext(EventTypesContext);

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
          <Form onSubmit={e => e.preventDefault()}>
            <h2>Create New Event</h2>

            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                maxLength={50}
                type="text"
                placeholder="Enter event name"
              />
              <Form.Text className="text-muted">
                Limit 50 characters.
              </Form.Text>
            </Form.Group>

            <fieldset>
              <Form.Group>
                <Form.Label as="legend">
                  What type of event is this?
                </Form.Label>
                <Row>
                  {Object.keys(eventTypes)
                    .map(type => [type, eventTypes[type].formal])
                    .map(typeInfo => (
                      <Col key={typeInfo[0]} sm={6} md={4}>
                        <Form.Check
                          type="radio"
                          label={typeInfo[1]}
                          name="eventType"
                          id={`event-type-${typeInfo[0]}`}
                          value={typeInfo[0]}
                        />
                      </Col>
                    ))}
                </Row>
              </Form.Group>
            </fieldset>

            <PickLocation />

            <Form.Group controlId="eventDescription">
              <Form.Label>Event description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={
                  "Describe your event! A few sentences should do the trick."
                } />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}





export default CreateEvent;