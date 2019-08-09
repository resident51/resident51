import React from "react";

import Form from "react-bootstrap/Form";

const EventDescriptionInput = ({ form: { values }, field }) => (
  <Form.Group controlId="eventDescription">
    <Form.Label>Event Description:</Form.Label>
    <Form.Control
      name="description"
      maxLength={1000}
      onChange={field.onChange}
      value={values.description}
      as="textarea"
      rows="5"
      placeholder={
        "A few sentences should do the trick! What can attendees expect?"
      }
    />
  </Form.Group>
);

export default EventDescriptionInput;
