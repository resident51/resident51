import React from 'react';

import clsx from 'clsx';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { EventR51 } from '@app/types';

import EventList from './EventList';

import useStyles from './_jss/EventTimelinePartition.jss';

interface EventTimelinePartitionProps {
  events: EventR51[];
  text: string;
  isLast?: boolean;
}

const EventTimelinePartition: React.FC<EventTimelinePartitionProps> = props => {
  const { events, text, isLast } = props;
  const classes = useStyles();

  if (events.length === 0) {
    return null;
  }

  return (
    <TimelineItem>
      <TimelineOppositeContent className={classes.timelineMarkerDefault}>
        <Typography variant="body2" color="textSecondary">
          {text}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector className={clsx({ [classes.lastTimelineConnector]: isLast })} />
      </TimelineSeparator>
      <TimelineContent className={classes.eventTimelineContent}>
        <div className={classes.timelineMarkerSmall}>
          <Typography variant="body2" color="textSecondary">
            {text}
          </Typography>
        </div>
        <EventList events={events} />
      </TimelineContent>
    </TimelineItem>
  );
};

export default EventTimelinePartition;
