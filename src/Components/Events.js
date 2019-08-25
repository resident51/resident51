import React, { useState, useContext } from 'react';

import { EventsContext } from "../Contexts/EventsContext";

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ColorKey from './EventComponents/ColorKey';
import ToCreateEvent from './EventComponents/ToCreateEvent';
import EventList from './EventComponents/EventList';

const Events = () => {

  const { events } = useContext(EventsContext);

  const [social, setSocial] = useState(true);
  const [meal, setMeal] = useState(true);
  const [community, setCommunity] = useState(true);
  const [meeting, setMeeting] = useState(true);
  const [alumni, setAlumni] = useState(true);
  const [campus, setCampus] = useState(true);
  
  const displayTypes = {
    social: [social, setSocial],
    meal: [meal, setMeal],
    community: [community, setCommunity],
    meeting: [meeting, setMeeting],
    alumni: [alumni, setAlumni],
    campus: [campus, setCampus]
  }

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={3}>
          <ColorKey showState={displayTypes} />
          <ToCreateEvent />
        </Col>

        <Col sm={12} md={8}>
          <h1>Schol Hall Events</h1>
          <EventList events={events} displayTypes={displayTypes} />
        </Col>
      </Row>
    </Container>
  )
}; 

export default Events