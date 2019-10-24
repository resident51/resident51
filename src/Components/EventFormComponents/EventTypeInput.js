import React, { useContext, Fragment } from "react";

import { EventsContext } from "../../Contexts/EventsContext";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventTypeInput = ({ form: { values, touched, errors }, field }) => {
  const { eventTypes } = useContext(EventsContext);

  return (
    <Fragment>
      <Form.Group>
        <Form.Label as="legend">What type of event is this?</Form.Label>
        <Row>
          {Object.keys(eventTypes)
            .map(type => ({ type, formal: eventTypes[type].formal }))
            .map(({ type, formal }) => (
              <Col key={type} sm={6} lg={4}>
                <Form.Check
                  required
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
      {errors.type && touched.type && (
        <Alert variant={"danger"}>{errors.type}</Alert>
      )}
    </Fragment>
  );
};

export default EventTypeInput;
