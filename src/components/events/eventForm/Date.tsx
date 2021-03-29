import React from 'react';

import moment from 'moment';
import { FieldProps } from 'formik';
import { TextField } from '@material-ui/core';

import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Date.jss';

const EventDateInput: React.FC<FieldProps<EventFormValues>> = props => {
  const { values } = props.form;
  const classes = useStyles();

  const dateValue = moment.unix(values.date).format('YYYY-MM-DDThh:mm');

  return (
    <TextField
      name="date"
      className={classes.date}
      label="Schedule this event"
      type="datetime-local"
      defaultValue={dateValue}
      InputLabelProps={{
        shrink: true,
      }}
      required
    />
  );
};

export default EventDateInput;
