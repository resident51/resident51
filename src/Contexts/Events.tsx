import React, { createContext, useContext, useEffect, useReducer } from 'react';

import EventsReducer from '../Reducers/Events.Reducer';
import {
  EventForm as EventFormType,
  EventToCFS,
  EventToCFSSubmission,
  EventTypeFormats,
  Events,
  Hall,
} from '../Types/';
import { currentEvents } from '../Firebase/firebase';

import {
  concatEvents,
  eventTypes,
  formatSubmittedEventByHall,
  halls,
  querySnapshot,
} from './EventsProps';
import { useUser } from './User';

interface EventsCtx {
  events: Events;
  formatSubmittedEvent: (event: EventFormType, submission: EventToCFSSubmission) => EventToCFS;
  eventTypes: EventTypeFormats;
  halls: Hall[];
}
export const EventsContext = createContext({} as EventsCtx);
export const useEvents = (): EventsCtx => useContext<EventsCtx>(EventsContext);

export const EventsProvider: React.FC = props => {
  const { user } = useUser();
  const [publicEvents, dispatchPublicEvents] = useReducer(EventsReducer, null);
  const [privateEvents, dispatchPrivateEvents] = useReducer(EventsReducer, null);
  const events = concatEvents(publicEvents, privateEvents);

  const userHall = (user.uid && user.hall) || 'Miller'; // #TODO: this is fucking awful
  const formatSubmittedEvent = formatSubmittedEventByHall(userHall);

  // Query all public events.
  useEffect(() => {
    const query = currentEvents.where('publicStatus.type', '==', 'public');
    return querySnapshot(dispatchPublicEvents, query);
  }, []);

  // Query all private events available to the user.
  useEffect(() => {
    const query = currentEvents.where('publicStatus.type', '==', 'private');
    if (user.permissions === 1) {
      const privateHallEvents = query.where('publicStatus.halls', 'array-contains', userHall);
      return querySnapshot(dispatchPrivateEvents, privateHallEvents);
    } else if (user.permissions > 1) {
      return querySnapshot(dispatchPrivateEvents, query);
    }
  }, [userHall, user.permissions]);

  return (
    <EventsContext.Provider value={{ events, formatSubmittedEvent, eventTypes, halls }}>
      {props.children}
    </EventsContext.Provider>
  );
};
