import React, { createContext, useContext, useEffect, useReducer } from 'react';

import {
  EventForm as EventFormType,
  EventToCFS,
  EventToCFSSubmission,
  EventTypeFormats,
  Events,
  Hall,
  SignedInUser,
} from '@app/types/';

import EventsReducer from '@app/reducers/Events.Reducer';
import { currentEvents } from '@app/firebase/firebase';

import {
  concatEvents,
  eventTypes,
  formatSubmittedEventByHall,
  halls,
  querySnapshot,
} from './utils/EventsProps';
import { useUser } from './User';

interface EventsCtx {
  events: Events;
  formatSubmittedEvent: (event: EventFormType, submission: EventToCFSSubmission) => EventToCFS;
  eventTypes: EventTypeFormats;
  halls: Hall[];
}
export const EventsContext = createContext({} as EventsCtx);
export const useEvents = (): EventsCtx => useContext<EventsCtx>(EventsContext);

const EventsProvider: React.FC = props => {
  const { user } = useUser();
  const [publicEvents, dispatchPublicEvents] = useReducer(EventsReducer, null);
  const [
    privateEvents,
    // dispatchPrivateEvents
  ] = useReducer(EventsReducer, null);
  const events = concatEvents(publicEvents, privateEvents);
  const signedInUser = user as SignedInUser;

  const userHall = (signedInUser?.uid && signedInUser?.hall) || 'Miller'; // #TODO: this is fucking awful
  const formatSubmittedEvent = formatSubmittedEventByHall(userHall);

  // Query all public events.
  useEffect(() => {
    const query = currentEvents.where('publicStatus.type', '==', 'public');
    return querySnapshot(dispatchPublicEvents, query);
  }, []);

  // Query all private events available to the user.
  // useEffect(() => {
  //   const query = currentEvents.where('publicStatus.type', '==', 'private');
  //   if (user?.permissions === 1) {
  //     const privateHallEvents = query.where('publicStatus.halls', 'array-contains', userHall);
  //     return querySnapshot(dispatchPrivateEvents, privateHallEvents);
  //   } else if (user?.permissions > 1) {
  //   return querySnapshot(dispatchPrivateEvents, query);
  //   }
  // }, [user, userHall]);

  return (
    <EventsContext.Provider value={{ events, formatSubmittedEvent, eventTypes, halls }}>
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
