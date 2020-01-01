import React from "react";

import Form from "react-bootstrap/Form";
import { FieldProps } from "formik";

import { FirstLoginFormValues } from '../FirstLoginForm';
import AlertInFormer from '../../Layout/AlertInFormer';

const ResidentName = (props: FieldProps<FirstLoginFormValues>) => {
  const { form: { values, touched, errors }, field } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="name">
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
          Facebook), so if "el1te_walu1g1_2005" isn't as cool as you first thought
          it was, you can change it here to something your president will recognize.
        </Form.Text>
      </Form.Group>
    </AlertInFormer>
  )
};

export default ResidentName;
