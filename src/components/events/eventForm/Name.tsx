import React from 'react';

import { FieldProps } from 'formik';

import TextField from '../../common/form/TextField';
import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Name.jss';

const EventNameInput: React.FC<FieldProps<EventFormValues>> = ({ field }) => {
  const classes = useStyles();

  return (
    <TextField
      inputProps={{ maxLength: 50 }}
      className={classes.name}
      name={field.name}
      label="Event name"
      required
    />
  );
};

export default EventNameInput;
