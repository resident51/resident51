import React from 'react';

import moment from 'moment';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

import { Link } from "react-router-dom";

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
        <Card.Title className="event-flex">
          <span>Location: {location}</span>
          <span id="event-admin-config" >
            <Link to={`/events/edit/${id}`} style={{color: "slategray"}}>
              Edit
            </Link>
            <span>  &middot;  </span>
            <Link to={`/events/delete/${id}`} style={{color: "red"}}>
              Delete
            </Link>
          </span>
        </Card.Title>
        <Card.Subtitle className="event-flex" >
          <span>Time: {moment(dateTime).format("h:mm A")}</span>
          <span>Event Type: {format.formal}</span>
        </Card.Subtitle>
        <hr />
        <p>{description}</p>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Event;