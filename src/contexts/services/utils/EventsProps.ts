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
  EventTypeFormats,
  Events,
  Hall,
} from '@app/types/';

import { EventAction } from '@app/reducers/Events.Reducer';
import { halls } from '@app/constants';

export const eventTypes: EventTypeFormats = {
  social: { formal: 'Social Event', color: 'green' },
  meeting: { formal: 'Meeting', color: 'orange' },
  community: { formal: 'Community Event', color: 'plum' },
  meal: { formal: 'Co-Hall Meal', color: 'lightcoral' },
  alumni: { formal: 'Alumni Event', color: 'maroon' },
  campus: { formal: 'Campus Event', color: 'lightseagreen' },
};

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
      ? halls
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
  showPublicEvents: boolean;
  togglePublicEvents: () => void;
  showPrivateEvents: boolean;
  togglePrivateEvents: () => void;
}

export const useEventFilters = (eventsUnfiltered: Events): { events: Events; filters: Filters } => {
  const [searchFilter, setSearchFilter] = useState('');
  const [showPublicEvents, setShowPublicEvents] = useState(true);
  const [showPrivateEvents, setShowPrivateEvents] = useState(true);

  const onSearchFilterChange = useCallback((input: { filter: string }): void => {
    setSearchFilter(input.filter.toLowerCase());
  }, []);

  const filters = useMemo(
    () => ({
      searchFilter,
      onSearchFilterChange,
      showPublicEvents,
      togglePublicEvents: (): void => setShowPublicEvents(current => !current),
      showPrivateEvents,
      togglePrivateEvents: (): void => setShowPrivateEvents(current => !current),
    }),
    [searchFilter, onSearchFilterChange, showPublicEvents, showPrivateEvents],
  );

  const eventsFiltered = useMemo(
    () =>
      eventsUnfiltered &&
      eventsUnfiltered?.filter(({ name, description, publicStatus }) => {
        const textFound =
          searchFilter.length === 0 ||
          name.toLowerCase().includes(searchFilter) ||
          description.toLowerCase().includes(searchFilter);

        const passesPublicFilter =
          publicStatus.type === 'public' ? showPublicEvents : showPrivateEvents;

        return textFound && passesPublicFilter;
      }),
    [eventsUnfiltered, searchFilter, showPublicEvents, showPrivateEvents],
  );

  return { events: eventsFiltered, filters };
};
