import React from 'react';

import { FieldProps } from 'formik';

import TextField from '../../common/form/TextField';
import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Description.jss';

const EventDescriptionInput: React.FC<FieldProps<EventFormValues>> = ({ field }) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.description}
      multiline
      rows={4}
      name={field.name}
      label="Description"
      required
    />
  );
};

export default EventDescriptionInput;
