import React from 'react';

import { FieldProps } from 'formik';

import { FormikTextField } from '@app/components/common/FormFields';

import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Description.jss';

const EventDescriptionInput: React.FC<FieldProps<EventFormValues>> = ({ field }) => {
  const classes = useStyles();
  return (
    <FormikTextField
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
