import React from "react";

import moment from "moment";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";

import Form from "react-bootstrap/Form";

const EventDateInput = ({ form: { setFieldValue, values }, field }) => (
  <Form.Group>
    <Form.Label>What day will this event take place?</Form.Label>
    <DayPickerSingleDateController
      date={values.date}
      onDateChange={value => field.onChange(setFieldValue(field.name, value))}
      isOutsideRange={date => date < moment()}
      hideKeyboardShortcutsPanel 
    />
  </Form.Group>
);

export default EventDateInput;
