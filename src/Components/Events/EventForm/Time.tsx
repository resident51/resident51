import React from 'react';

import Form from 'react-bootstrap/Form';

import { FieldProps } from 'formik';
import { EventFormValues } from '../EventForm';
import AlertInFormer from '../../Common/AlertInFormer';

const EventTimeInput: React.FC<FieldProps<EventFormValues>> = props => {
  const {
    form: { values, touched, errors },
    field,
  } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="time">
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
    </AlertInFormer>
  );
};

export default EventTimeInput;
