import React, { useContext } from "react";

import { EventTypesContext } from "../../../Contexts/EventTypesContext";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";

const EventTypeInput = ({ form: { values }, field }) => {
  const { eventTypes } = useContext(EventTypesContext);

  return (
    <Row>
      {Object.keys(eventTypes)
        .map(type => ({ type, formal: eventTypes[type].formal }))
        .map(({ type, formal }) => (
          <Col key={type} sm={6} md={4}>
            <Form.Check
              custom
              type="radio"
              label={formal}
              name="type"
              id={`event-type-${type}`}
              onChange={field.onChange}
              value={type}
              checked={values.type === type}
            />
          </Col>
        ))}
    </Row>
  )
};

// <Form.Control
//   name="name"
//   maxLength={50}
//   onChange={field.onChange}
//   value={values.name}
//   type="text"
//   placeholder="Enter event name"
// />
export default EventTypeInput;