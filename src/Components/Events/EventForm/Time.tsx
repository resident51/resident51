import React, { Fragment } from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

import { FieldProps } from "formik";
import { EventFormValues } from '../EventForm';

const EventTimeInput = (props: FieldProps<EventFormValues>) => {
  const { form: { values, touched, errors }, field } = props;

  return (
    <Fragment>
      <Form.Group>
        <Form.Label>What time will this event take place?</Form.Label>
        <Form.Control
          required
          name="time"
          onChange={field.onChange}
          value={values.time}
          type="time"
        />
      </Form.Group>
      {errors.time && touched.time && (
        <Alert variant={"danger"}>{errors.time}</Alert>
      )}
    </Fragment>
  );
};

export default EventTimeInput;
