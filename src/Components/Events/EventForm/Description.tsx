import React, { Fragment } from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

import { FieldProps } from 'formik';
import { EventFormValues } from '../EventForm';

const EventDescriptionInput = (props: FieldProps<EventFormValues>) => {
  const { form: { values, touched, errors }, field } = props;

  return (
    <Fragment>
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
      {errors.description && touched.description && (
        <Alert variant={"danger"}>{errors.description}</Alert>
      )}
    </Fragment>
  )
};

export default EventDescriptionInput;