import React, { Fragment } from "react";

import moment from "moment";
import "react-dates/initialize";
import { DayPickerSingleDateController, isInclusivelyBeforeDay } from "react-dates";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const EventDateInput = ({
  form: { setFieldValue, values, errors, touched },
  field
}) => (
  <Fragment>
    <Form.Group>
      <Form.Label>What day will this event take place?</Form.Label>
      <DayPickerSingleDateController
        date={values.date || null}
        focused={true}
        onDateChange={value => 
          setFieldValue(field.name, value)
        }
        isOutsideRange={date => isInclusivelyBeforeDay(date, moment())}
        hideKeyboardShortcutsPanel
      />
    </Form.Group>
    {errors.date && touched.date && (
      <Alert variant={"danger"}>{errors.date}</Alert>
    )}
  </Fragment>
);

export default EventDateInput;
