import React from 'react';

import moment from 'moment';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

import lorem from '../../tests/lorem';
const gen = lorem.generateSentences.bind(lorem);

const Event = ({ 
  event: { id, name, location, description, dateTime }, 
  format 
}) => (
  <Card>
    <Accordion.Toggle
      as={Card.Header}
      className="event-header"
      eventKey={id}
      style={{
        borderLeft: `10px solid ${format.color}`
      }}
    >
      <strong>{name}</strong>
      <i className="event-date">
        {moment(dateTime).format("MMMM Do, YYYY")}
      </i>
    </Accordion.Toggle>

    <Accordion.Collapse eventKey={id}>
      <Card.Body>
        <Card.Title>
          Location: {location}
        </Card.Title>
        <Card.Subtitle className="event-subtitle" >
          <span>Time: {moment(dateTime).format("h:mm A")}</span>
          <span>Event Type: {format.formal}</span>
        </Card.Subtitle>
        <hr />
        <p>{gen(9) || description}</p>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Event;