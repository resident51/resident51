import React from "react";

import Form from "react-bootstrap/Form";

const EventRecurringInput = ({ form: { values }, field }) => (
  <Form.Group>
    <Form.Label>Is this a recurring event?</Form.Label>
    <Form.Check
      name="recurring"
      label={
        values.recurring
          ? "Yes, this is a regularly occurring event."
          : "No, this event only occurs once this semester."
      }
      checked={values.recurring}
      onChange={field.onChange}
      value={values.recurring}
    />
    {values.recurring && (
      <Form.Text className="text-muted">
        (Adding recurring events automatically is still in the works!)
      </Form.Text>
    )}
  </Form.Group>
);

export default EventRecurringInput;
