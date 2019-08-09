import React from "react";

import Form from "react-bootstrap/Form";

const EventTimeInput = ({ form: { values }, field }) => (
  <Form.Group>
    <Form.Label>What time will this event take place?</Form.Label>
    <Form.Control
      name="time"
      onChange={field.onChange}
      value={values.time}
      type="time"
    />
  </Form.Group>
);

export default EventTimeInput;
