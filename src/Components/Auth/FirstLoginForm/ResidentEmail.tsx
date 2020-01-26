import React from "react";

import { VerificationRequest } from "../../../Types";

import { FieldProps } from "formik";

import Form from "react-bootstrap/Form";

import AlertInFormer from "../../Common/AlertInFormer";

const ResidentEmail: React.FC<FieldProps<VerificationRequest>> = props => {
  const {
    form: { values, touched, errors },
    field
  } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="email">
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
          We only need this to verify you're a KU student. We'll send you a verification link, then
          you're good to go.
        </Form.Text>
      </Form.Group>
    </AlertInFormer>
  );
};

export default ResidentEmail;
