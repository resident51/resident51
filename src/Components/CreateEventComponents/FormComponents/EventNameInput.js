import React from "react";

import Form from "react-bootstrap/Form";

const EventNameInput = ({ form: { values }, field }) => (
  <Form.Control
    name="name"
    maxLength={50}
    onChange={field.onChange}
    value={values.name}
    type="text"
    placeholder="Enter event name"
  />
);

export default EventNameInput;






