import React from "react";

import Form from "react-bootstrap/Form";

const EventTimeInput = ({ form: { values }, field }) => (
  <Form.Control
    name="faketime"
    onChange={field.onChange}
    value={values.faketime}
    type="time"
  />
);

export default EventTimeInput;