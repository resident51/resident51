import React, { useMemo } from 'react';

import moment from 'moment';
import { Button, Grid, Typography } from '@material-ui/core';
import { FastField, Field, Form, Formik, FormikHelpers } from 'formik';

import { EventForm as EventFormType, EventR51, Hall, SignedInUser } from '@app/types';

import PromptIfDirty from '../common/form/PromptIfDirty';

import EventDateInput from './eventForm/Date';
import EventDescriptionInput from './eventForm/Description';
import EventFacilitationInput from './eventForm/Facilitation';
import EventLocationInput from './eventForm/Location';
import EventNameInput from './eventForm/Name';
import EventPublicInput from './eventForm/Public';
// import EventTimeInput from './eventForm/Time';
import EventTypeInput from './eventForm/Type';
import validationSchema from './eventForm/validationSchema';

import useStyles from './_jss/EventForm.jss';

const threeDaysFromNow = Date.now() + 1000 * 60 * 60 * 24 * 3;

export type EventFormValues = {
  name: string;
  type: string;
  description: string;
  location: string;
  date: number;
  time: string;
  publicStatus: {
    type: string;
    halls: Hall[];
  };
  facilitation: {
    organizationType: string;
    organizationName: string;
  };
};

interface EventFormProps {
  user: SignedInUser;
  event?: EventR51;
  onSubmit: (event: EventFormType, actions: FormikHelpers<EventFormType>) => void;
  eventUpdated?: boolean;
}

const FormSectionHeader: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.formSectionHeader} variant="h5">
      {children}
    </Typography>
  );
};

const EventForm: React.FC<EventFormProps> = props => {
  const { user, event, onSubmit } = props;

  // const classes = useStyles();

  const formValidationSchema = useMemo(() => validationSchema(), []);

  const formInitialValues = useMemo(() => {
    const formEvent = event || ({} as EventR51);
    const dateTimeMoment = moment(formEvent.dateTime || threeDaysFromNow);
    const initialValues: EventFormType = {
      id: formEvent.id || '',
      name: formEvent.name || '',
      type: formEvent.type || undefined,
      description: formEvent.description || '',
      location: formEvent.location || '',
      date: dateTimeMoment.unix(),
      time: formEvent.dateTime ? dateTimeMoment.format('kk:mm') : '18:00',
      publicStatus: formEvent.publicStatus || {
        type: 'public',
        halls: user.hall ? [user.hall] : [],
      },
      facilitation: formEvent.facilitation || {
        organizationType: undefined,
        organizationName: '',
      },
    };
    return initialValues;
  }, [event, user.hall]);

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validationSchema={formValidationSchema}
    >
      {({ handleSubmit, isSubmitting }): React.ReactElement => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <PromptIfDirty />

            <FormSectionHeader>1. Name this event</FormSectionHeader>
            <FastField name="name" component={EventNameInput} />

            <FormSectionHeader>2. Describe this event</FormSectionHeader>
            <FastField name="type" component={EventTypeInput} />
            <FastField name="description" component={EventDescriptionInput} />

            <FormSectionHeader>3. Schedule this event</FormSectionHeader>
            <FastField name="date" component={EventDateInput} />
            {/* <FastField name="time" component={EventTimeInput} /> */}

            <FormSectionHeader>4. Choose location</FormSectionHeader>
            <FastField name="location" component={EventLocationInput} />

            <FormSectionHeader>5. Choose attendees</FormSectionHeader>
            <FastField name="publicStatus" component={EventPublicInput} />

            <FormSectionHeader>6. Extra info</FormSectionHeader>
            <Field name="facilitation" component={EventFacilitationInput} />

            <Grid container direction="row" justify="center" alignItems="center">
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EventForm;
