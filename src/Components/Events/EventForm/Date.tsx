import React, { useMemo } from "react";

import moment from "moment";
import "react-dates/initialize";
import { DayPickerSingleDateController, isInclusivelyBeforeDay } from "react-dates";

import Form from "react-bootstrap/Form";
import { FieldProps } from "formik";
import { EventFormValues } from '../EventForm';
import AlertInFormer from '../../Layout/AlertInFormer';

const EventDateInput = (props: FieldProps<EventFormValues>) => {
  const {
    form: { setFieldValue, values, errors, touched },
    field
  } = props;

  const momentToday = useMemo(() => moment(), []);
  const momentDate = moment.unix(values.date);

  return (
    <AlertInFormer errors={errors} touched={touched} name="date">
      <Form.Group>
        <Form.Label>What day will this event take place?</Form.Label>
        <DayPickerSingleDateController
          date={momentDate}
          focused
          onFocusChange={() => {}}
          onDateChange={dateValue => {
            if(dateValue === null) return;
            const nextDate = dateValue.unix();
            setFieldValue(field.name, nextDate);
          }}
          isOutsideRange={date => isInclusivelyBeforeDay(date, momentToday)}
          hideKeyboardShortcutsPanel
        />
      </Form.Group>
    </AlertInFormer>
  )
};

export default EventDateInput;
