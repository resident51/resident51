import React from 'react';

import { FieldProps } from 'formik';
import { Grid } from '@material-ui/core';

import { FormikTextField } from '@app/components/common/FormFields';

import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Description.jss';

const EventDescriptionInput: React.FC<FieldProps<EventFormValues>> = ({ field }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <FormikTextField
        className={classes.description}
        multiline
        rows={4}
        name={field.name}
        label="Description"
        required
      />
    </Grid>
  );
};

export default EventDescriptionInput;
