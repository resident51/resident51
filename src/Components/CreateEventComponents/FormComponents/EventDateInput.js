import React from "react";

import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/initialize';

const EventDateInput = ({ 
  form: { 
    setFieldValue, 
    values 
  }, 
  field
}) => (
  <DayPickerSingleDateController
    date={values.dateTime}
    onDateChange={value => 
      field.onChange(setFieldValue(field.name, value)
    )}
    isOutsideRange={date => date < moment()}
  />
);

export default EventDateInput;