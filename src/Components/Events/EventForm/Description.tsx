import React from "react";

import Form from "react-bootstrap/Form";

import { FieldProps } from "formik";
import { EventFormValues } from "../EventForm";
import AlertInFormer from "../../Layout/AlertInFormer";

const EventDescriptionInput: React.FC<FieldProps<EventFormValues>> = props => {
  const {
    form: { values, touched, errors },
    field
  } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="description">
      <Form.Group controlId="eventDescription">
        <Form.Label>Event Description:</Form.Label>
        <Form.Control
          name="description"
          maxLength={1000}
          onChange={field.onChange}
          value={values.description}
          required
          as="textarea"
          rows="5"
          placeholder="A few sentences should do the trick! What can attendees expect?"
        />
      </Form.Group>
    </AlertInFormer>
  );
};

export default EventDescriptionInput;
