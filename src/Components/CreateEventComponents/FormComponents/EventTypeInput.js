import React, { useContext } from "react";

import { EventTypesContext } from "../../../Contexts/EventTypesContext";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventTypeInput = ({ form: { values }, field }) => {
  const { eventTypes } = useContext(EventTypesContext);

  return (
    <Form.Group>
      <Form.Label as="legend">What type of event is this?</Form.Label>
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
    </Form.Group>
  );
};

export default EventTypeInput;
