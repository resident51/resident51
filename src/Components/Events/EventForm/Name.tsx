import React from "react";

import Form from "react-bootstrap/Form";

import { FieldProps } from "formik";
import { EventFormValues } from "../EventForm";
import AlertInFormer from "../../Common/AlertInFormer";

const EventNameInput: React.FC<FieldProps<EventFormValues>> = props => {
  const {
    form: { values, touched, errors },
    field
  } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="name">
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
          Limit 50 Characters ({50 - (values.name ? values.name.length : 0)} remaining)
        </Form.Text>
      </Form.Group>
    </AlertInFormer>
  );
};

export default EventNameInput;
