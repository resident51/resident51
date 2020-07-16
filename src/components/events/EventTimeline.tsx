import React, { useMemo } from 'react';

import clsx from 'clsx';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { EventR51 } from '@app/types';

import { months } from '@app/constants';

import EventList from './EventList';

import useStyles from './_jss/EventTimeline.jss';

/**
 * Convert a string with the month and year into a display-worth string that is specific to the
 * current year.
 *
 * @param {string} monthId string identifying the month and year. Example 2,2005 === March 2005
 * @param {string} currentYear the current year as a string
 */
const monthIdToMonthYearString = (monthId: string, currentYear: string): string => {
  const [month, year] = monthId.split(',');
  const yearString = currentYear === year ? '' : ` ${year}`;
  const monthFull = months[+month];
  const monthString = yearString.length === 0 ? monthFull : monthFull.substring(0, 3);
  return `${monthString}${yearString}`;
};

interface EventTimelineProps {
  events: EventR51[];
}

type EventPartitionList = { monthId: string; events: EventR51[] }[];

const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  const classes = useStyles();

  const eventPartitions = useMemo(() => {
    return events.reduce<EventPartitionList>((partitions, event) => {
      const eventDate = new Date(event.dateTime);
      const monthIdentifier = `${eventDate.getMonth()},${eventDate.getFullYear()}`;
      if (partitions.length && partitions[partitions.length - 1].monthId === monthIdentifier) {
        partitions[partitions.length - 1].events.push(event);
      } else {
        partitions.push({ monthId: monthIdentifier, events: [event] });
      }
      return partitions;
    }, []);
  }, [events]);

  const eventDate = new Date();
  const currentYearString = `${new Date().getFullYear()}`;
  const monthIdNow = `${eventDate.getMonth()},${eventDate.getFullYear()}`;
  const firstPartitionIsThisMonth = eventPartitions[0].monthId === monthIdNow;

  return (
    <Timeline align="left" className={classes.eventTimelineRoot}>
      {eventPartitions.map((partition, index) => {
        const marker = (
          <Typography variant="body2" color="textSecondary">
            {index === 0 && firstPartitionIsThisMonth
              ? 'This month'
              : monthIdToMonthYearString(partition.monthId, currentYearString)}
          </Typography>
        );
        return (
          <TimelineItem key={partition.monthId}>
            <TimelineOppositeContent className={classes.timelineMarkerDefault}>
              {marker}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector
                className={clsx({
                  [classes.lastTimelineConnector]: index === eventPartitions.length - 1,
                })}
              />
            </TimelineSeparator>
            <TimelineContent className={classes.eventTimelineContent}>
              <div className={classes.timelineMarkerSmall}>{marker}</div>
              <EventList events={partition.events} />
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default EventTimeline;
