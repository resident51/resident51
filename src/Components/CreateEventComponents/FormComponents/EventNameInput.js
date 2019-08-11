import React, { Fragment } from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const EventNameInput = ({ form: { values, touched, errors }, field }) => (
  <Fragment>
    <Form.Group controlId="eventName">
      <Form.Label>Event Name</Form.Label>
      <Form.Control
        name="name"
        required
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
    {errors.name && touched.name && (
      <Alert variant={"danger"}>{errors.name}</Alert>
    )}
  </Fragment>
);

export default EventNameInput;
