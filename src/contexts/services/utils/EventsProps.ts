import { useCallback, useMemo, useState } from 'react';

import moment from 'moment';
import { firestore } from 'firebase/app';

import {
  CFSEvent,
  EventFormPublicType,
  EventForm as EventFormType,
  EventR51,
  EventToCFS,
  EventToCFSSubmission,
  Events,
  Hall,
} from '@app/types/';

import { EventAction } from '@app/reducers/Events.Reducer';
import { HALLS } from '@app/constants';

/**
 * Fetch events from Cloud Firestore based on User's permissions.
 */
export const querySnapshot = (
  dispatch: React.Dispatch<EventAction>,
  query: firebase.firestore.Query,
): (() => void) =>
  query.onSnapshot(snapshot => {
    if (!snapshot.size) return dispatch({ type: 'EMPTY' });

    snapshot.docChanges().forEach(function(change) {
      const type = change.type.toUpperCase() as 'ADDED' | 'MODIFIED' | 'REMOVED';
      const event = formatRetrievedEvent({
        ...change.doc.data({ serverTimestamps: 'estimate' }),
        id: change.doc.id,
      } as CFSEvent);

      dispatch({ type, event });
    });
  });

const determineEventType = (publicStatusCFS: CFSEvent['publicStatus']): EventFormPublicType => {
  if (publicStatusCFS.type === 'private') {
    return publicStatusCFS.halls.length === 1 ? 'hall' : 'halls';
  } else {
    return 'public';
  }
};

// Format event queried from Firebase
export const formatRetrievedEvent = (event: CFSEvent): EventR51 => ({
  ...event,
  dateTime: event.dateTime.toMillis(),
  publicStatus: {
    type: determineEventType(event.publicStatus),
    halls: event.publicStatus.halls,
  },
  lastEdit: event.lastEdit.toMillis(),
  submission: {
    ...event.submission,
    dateTime: event.submission.dateTime.toMillis(),
  },
});

const determineCFSEventType = (
  hall: Hall,
  publicStatus: EventR51['publicStatus'],
): CFSEvent['publicStatus'] => ({
  type: publicStatus.type === 'public' ? 'public' : 'private',
  halls:
    publicStatus.type === 'public'
      ? (HALLS as Hall[])
      : publicStatus.type === 'hall'
      ? [hall]
      : publicStatus.halls,
});

// Format event before sending to Firebase
export const formatSubmittedEventByHall = (hall: Hall) => (
  event: EventFormType,
  submission: EventToCFSSubmission,
): EventToCFS => {
  // destructure date and time off of event
  const { date, time, ...eventFromForm } = event;
  const [hour, minute] = time.split(':').map(num => +num);
  const momentDate = moment.unix(date);

  return {
    ...eventFromForm,
    dateTime: momentDate
      .hour(hour)
      .minute(minute)
      .toDate(),
    publicStatus: determineCFSEventType(hall, event.publicStatus),
    lastEdit: firestore.FieldValue.serverTimestamp(),
    submission,
  };
};

export const concatEvents = (publicEvents: Events, privateEvents: Events): Events => {
  if (publicEvents === null) {
    return privateEvents;
  } else if (privateEvents === null) {
    return publicEvents;
  } else {
    return publicEvents.concat(privateEvents);
  }
};

export interface Filters {
  searchFilter: string;
  onSearchFilterChange: (input: { filter: string }) => void;
}

export const useEventFilters = (eventsUnfiltered: Events): { events: Events; filters: Filters } => {
  const [searchFilter, setSearchFilter] = useState('');

  const onSearchFilterChange = useCallback((input: { filter: string }): void => {
    setSearchFilter(input.filter.toLowerCase());
  }, []);

  const filters = useMemo(
    () => ({
      searchFilter,
      onSearchFilterChange,
    }),
    [searchFilter, onSearchFilterChange],
  );

  const eventsFiltered = useMemo(
    () =>
      eventsUnfiltered &&
      eventsUnfiltered?.filter(({ name, description }) => {
        const textFound =
          searchFilter.length === 0 ||
          name.toLowerCase().includes(searchFilter) ||
          description.toLowerCase().includes(searchFilter);

        return textFound;
      }),
    [eventsUnfiltered, searchFilter],
  );

  return { events: eventsFiltered, filters };
};
