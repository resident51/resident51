import React, { useMemo } from 'react';

import moment from 'moment';
import { Timeline } from '@material-ui/lab';

import { EventR51 } from '@app/types';

import { months } from '@app/constants';

import EventTimelinePartition from './EventTimelinePartition';

import useStyles from './_jss/EventTimeline.jss';

/**
 * Convert a string with the month and year into a display-worth string that is specific to the
 * current year.
 *
 * @param {string} monthKey string identifying the month and year. Example 2,2005 === March 2005
 * @param {string} currentYear the current year as a string
 */
const monthIdToMonthYearString = (monthKey: string, currentYear: string): string => {
  const year = monthKey.slice(0, 4);
  const month = monthKey.slice(-2);
  const yearString = currentYear === year ? '' : ` ${year}`;
  const monthFull = months[+month];
  const monthString = yearString.length === 0 ? monthFull : monthFull.substring(0, 3);
  return `${monthString}${yearString}`;
};

/**
 * Convert a number to a two-digit string.
 */
const to2Digit = (num: number): string => `0${num}`.slice(-2);

type PartitionSet = {
  today: EventR51[];
  thisWeek: EventR51[];
  month: EventR51[];
  months: { [monthKey: string]: EventR51[] };
};

const EventTimeline: React.FC<{ events: EventR51[] }> = ({ events }) => {
  const classes = useStyles();

  const eventPartitions = useMemo(() => {
    const sortedEvents = [...events].sort((e1, e2) => e1.dateTime - e2.dateTime);

    const partitions: PartitionSet = {
      today: [],
      thisWeek: [],
      month: [],
      months: {},
    };
    const now = moment();
    const day = now.dayOfYear();
    const week = now.isoWeek();
    const month = now.month();

    for (let i = 0; i < sortedEvents.length; i++) {
      const event = sortedEvents[i];
      const eventMoment = moment(new Date(event.dateTime));
      if (eventMoment.dayOfYear() === day) {
        partitions.today.push(event);
      } else if (eventMoment.isoWeek() === week) {
        partitions.thisWeek.push(event);
      } else if (eventMoment.month() === month) {
        partitions.month.push(event);
      } else {
        // eg. April 2020 becomes 202003
        const monthKey = `${eventMoment.year()}${to2Digit(eventMoment.month())}`;
        if (partitions.months[monthKey]) {
          partitions.months[monthKey].push(event);
        } else {
          partitions.months[monthKey] = [event];
        }
      }
    }
    return partitions;
  }, [events]);

  const currentYearString = `${new Date().getFullYear()}`;

  const monthsWithEvents = Object.entries(eventPartitions.months);

  return (
    <Timeline align="left" className={classes.eventTimelineRoot}>
      <EventTimelinePartition
        text="Today"
        events={eventPartitions.today}
        isLast={
          eventPartitions.thisWeek.length === 0 &&
          eventPartitions.month.length === 0 &&
          monthsWithEvents.length === 0
        }
      />
      <EventTimelinePartition
        text="This Week"
        events={eventPartitions.thisWeek}
        isLast={eventPartitions.month.length === 0 && monthsWithEvents.length === 0}
      />
      <EventTimelinePartition
        text="This Month"
        events={eventPartitions.month}
        isLast={monthsWithEvents.length === 0}
      />
      {monthsWithEvents
        // Sort by monthKeys, which have the form "202003" for April 2020, for example.
        .sort((month1, month2) => Number(month1[0]) - Number(month2[0]))

        // Now that the monthly partitions are sorted by date, render one for each upcoming month.
        .map(([monthKey, eventList], index, arr) => (
          <EventTimelinePartition
            key={monthKey}
            text={monthIdToMonthYearString(monthKey, currentYearString)}
            events={eventList}
            isLast={index === arr.length - 1}
          />
        ))}
    </Timeline>
  );
};

export default EventTimeline;
