import React from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const ResidentEmail = ({ form: { values, touched, errors }, field }) => (
  <>
    <Form.Group controlId="residentEmail">
      <Form.Label>KU Email:</Form.Label>
      <Form.Control
        name="email"
        required
        maxLength={100}
        onChange={field.onChange}
        value={values.email}
        type="text"
        placeholder="a123b456@ku.edu or something..."
      />
      <Form.Text className="text-muted">
        We only need this to verify you're a KU student. We'll send you a
        verification link, then you're good to go.
      </Form.Text>
    </Form.Group>
    {errors.email && touched.email && (
      <Alert variant={"danger"}>{errors.email}</Alert>
    )}
  </>
);

export default ResidentEmail;
