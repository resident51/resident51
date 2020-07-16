import React, { useMemo } from 'react';

import { Divider, List } from '@material-ui/core';

import { Events } from '@app/types';

import Event from './Event';

import useStyles from './_jss/EventList.jss';

interface EventListProps {
  events: Events;
  showDivider?: boolean;
}
const EventList: React.FC<EventListProps> = ({ events, showDivider = false }) => {
  const classes = useStyles();

  const eventsSorted = useMemo(() => {
    if (!events) {
      return events;
    }
    return events.sort((e1, e2) => e1.dateTime - e2.dateTime);
  }, [events]);

  if (eventsSorted === null) {
    return <p>loading events...</p>;
  } else if (eventsSorted.length === 0) {
    return <p>no events.</p>;
  }

  return (
    <List className={classes.eventList}>
      {events?.map((event, index, arr) => (
        <React.Fragment key={event.id}>
          <Event event={event} />
          {showDivider && index < arr.length - 1 ? (
            <Divider variant="inset" component="li" />
          ) : null}
        </React.Fragment>
      ))}
    </List>
  );
};

export default EventList;
