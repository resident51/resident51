import React from 'react';

import { FieldProps } from 'formik';

import { FormikTextField } from '@app/components/common/FormFields';

import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Name.jss';

const EventNameInput: React.FC<FieldProps<EventFormValues>> = ({ field }) => {
  const classes = useStyles();

  return (
    <FormikTextField
      inputProps={{ maxLength: 50 }}
      className={classes.name}
      name={field.name}
      label="Event name"
      required
    />
  );
};

export default EventNameInput;
