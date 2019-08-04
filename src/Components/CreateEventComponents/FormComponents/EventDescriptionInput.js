import React from "react";

import Form from "react-bootstrap/Form";

const EventDescriptionInput = ({ form: { values }, field }) => (
  <Form.Control
    name="description"
    maxLength={500}
    onChange={field.onChange}
    value={values.description}
    as="textarea"
    placeholder={
      "A few sentences should do the trick! What can attendees expect?"
    } />
);

export default EventDescriptionInput;