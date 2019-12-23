import React from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { FieldProps } from "formik";

import { FirstLoginFormValues } from '../FirstLoginForm';

const ResidentName = (props: FieldProps<FirstLoginFormValues>) => {
  const { form: { values, touched, errors }, field } = props;

  return (
    <>
      <Form.Group controlId="residentName">
        <Form.Label>Display name:</Form.Label>
        <Form.Control
          name="name"
          required
          type="text"
          maxLength={100}
          onChange={field.onChange}
          value={values.name}
          placeholder="Display name"
        />
        <Form.Text className="text-muted">
          We pulled this from the provider you used to sign in (Google or
          Facebook), so if "el1te_Un1c0rn_2004" isn't as cool as you thought
          it was, you can change it here to something your president will recognize.
        </Form.Text>
      </Form.Group>
      {errors.name && touched.name && (
        <Alert variant={"danger"}>{errors.name}</Alert>
      )}
    </>
  )
};

export default ResidentName;
