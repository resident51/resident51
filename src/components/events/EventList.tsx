import React, { useMemo } from 'react';

import { Divider, List } from '@material-ui/core';

import { Events } from '@app/types';

import Event from './Event';

import useStyles from './_jss/EventList.jss';

export type EventSortMethod = 'date' | 'name' | 'type';
export const eventSortMethods: EventSortMethod[] = ['date', 'name', 'type'];

interface EventListProps {
  events: Events;
  sortMethod?: EventSortMethod;
}
const EventList: React.FC<EventListProps> = ({ events, sortMethod = 'date' }) => {
  const classes = useStyles();

  const eventsSorted = useMemo(() => {
    if (!events) {
      return events;
    }
    switch (sortMethod) {
      case 'date':
        return events.sort((e1, e2) => e1.dateTime - e2.dateTime);
      case 'name':
        return events.sort((e1, e2) => e1.name.toLowerCase().localeCompare(e2.name.toLowerCase()));
      case 'type':
        return events.sort((e1, e2) => e1.type.toLowerCase().localeCompare(e2.type.toLowerCase()));
      default:
        return events.sort((e1, e2) => e1.dateTime - e2.dateTime);
    }
  }, [events, sortMethod]);

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
          {index === arr.length - 1 ? null : <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default EventList;
