import React from "react";

import Form from "react-bootstrap/Form";

const EventNameInput = ({ form: { values }, field }) => (
  <Form.Group controlId="eventName">
    <Form.Label>Event Name</Form.Label>
    <Form.Control
      name="name"
      maxLength={50}
      onChange={field.onChange}
      value={values.name}
      type="text"
      placeholder="Enter event name"
    />
    <Form.Text className="text-muted">
      Limit 50 Characters ({50 - (values.name ? values.name.length : 0)}{" "}
      remaining)
    </Form.Text>
  </Form.Group>
);

export default EventNameInput;
