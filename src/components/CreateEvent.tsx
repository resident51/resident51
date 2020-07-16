import React, { useCallback } from 'react';

import { FormikHelpers } from 'formik';
import { Typography } from '@material-ui/core';
import { firestore } from 'firebase';
import { useHistory } from 'react-router-dom';

import { EventForm as EventFormType, SignedInUser } from '@app/types';

import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { eventsCollection } from '@app/firebase/firebase';
import { useEvents } from '@app/contexts/services/Events';
import { useUser } from '@app/contexts/services/User';

import EventForm from './events/EventForm';

import useStyles from './_jss/CreateEvent.jss';

const CreateEvent: React.FC = () => {
  useDocumentTitle('Create Event');

  const { user } = useUser();
  const { formatSubmittedEvent } = useEvents();

  const history = useHistory();
  const classes = useStyles();

  // After event is validated, dispatch the event to firebase and redirect to the events page.
  const onSubmit = useCallback(
    (event: EventFormType, actions: FormikHelpers<EventFormType>): void => {
      // #TODO let residents request events be created.
      // if (!user || !user.signedIn || user.permissions < 2) return;
      if (!user || !user.signedIn) return;

      const formattedEvent = formatSubmittedEvent(event, {
        userId: user.uid,
        displayName: user.displayName,
        hall: (user as SignedInUser).hall,
        dateTime: firestore.FieldValue.serverTimestamp(),
      });

      eventsCollection
        .add(formattedEvent)
        .then(() => history.push('/events', { update: 'Event created!', t: Date.now() }))
        .catch(e => {
          actions.setSubmitting(false);
          console.error(e);
        });
    },
    [formatSubmittedEvent, history, user],
  );

  if (!user || !user.signedIn) return <div />;

  // const canCreate = user.permissions >= 2;
  const canCreate = user.signedIn; // redundant for now, need to update when permissions are flushed out
  const action = canCreate ? 'Create' : 'Submit';

  return (
    <div className={classes.eventsRoot}>
      <Typography className={classes.title} variant="h3">
        {action} Event
      </Typography>
      <EventForm user={user} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateEvent;
