import React, { useContext, useEffect } from 'react';

import { EventsContext } from "../Contexts/Events";

import useEventTypes from '../Hooks/useEventTypes';

import Alert from "react-bootstrap/Alert";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ColorKey from './Events/ColorKey';
import ToCreateEvent from './Events/ToCreateEvent';
import EventList from './Events/EventList';

const Events = ({ history }) => {
  useEffect(() => {
    document.title = "Events | Resident 51";
  });

  const { events } = useContext(EventsContext);

  // Show updates from history state API when events are mutated
  const update = history.location.state && history.location.state.update;

  const displayTypes = useEventTypes();

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-end">
        <Col md={8}>
          <h1 className="text-center mb-4" >Schol Hall Events</h1>          
        </Col>
      </Row>
      <Row className="justify-content-md-center px-lg-4 px-md-2">
        <Col sm={12} md={4}>
          <ColorKey showState={displayTypes} />
          <ToCreateEvent />
        </Col>
        <Col sm={12} md={8}>
          {update && <Alert variant="success">{update}</Alert> }
          <EventList events={events} displayTypes={displayTypes} />
        </Col>
      </Row>
    </Container>
  )
};

export default Events;