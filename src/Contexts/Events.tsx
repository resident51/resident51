import React, { useReducer, createContext, useContext, useEffect } from 'react';

import {
  EventToCFS,
  EventToCFSSubmission,
  EventForm as EventFormType,
  Events,
  Hall,
  EventTypeFormats,
} from '../Types/';

import { currentEvents } from '../Firebase/firebase';
import EventsReducer from '../Reducers/Events.Reducer';
import { UserContext } from './User';
import {
  querySnapshot,
  formatSubmittedEventByHall,
  halls,
  eventTypes,
  concatEvents,
} from './EventsProps';

interface EventContextProps {
  events: Events;
  formatSubmittedEvent: (event: EventFormType, submission: EventToCFSSubmission) => EventToCFS;
  eventTypes: EventTypeFormats;
  halls: Hall[];
}
export const EventsContext = createContext({} as EventContextProps);

export const EventsProvider: React.FC = props => {
  const { user } = useContext(UserContext);
  const [publicEvents, dispatchPublicEvents] = useReducer(EventsReducer, null);
  const [privateEvents, dispatchPrivateEvents] = useReducer(EventsReducer, null);
  const events = concatEvents(publicEvents, privateEvents);

  const hall = user && user.hall;
  const formatSubmittedEvent = formatSubmittedEventByHall(hall || 'Miller'); // #TODO: this is fucking awful
  const queryPerms = user ? user.permissions : -1;

  // Query all public events.
  useEffect(() => {
    const query = currentEvents.where('publicStatus.type', '==', 'public');
    return querySnapshot(dispatchPublicEvents, query);
  }, []);

  // Query all private events available to the user.
  useEffect(() => {
    console.log('mmmmmm private events');
    if (user && user.permissions) {
      const query = currentEvents.where('publicStatus.type', '==', 'private');
      if (user.permissions === 1) {
        const privateHallEvents = query.where('publicStatus.halls', 'array-contains', user.hall);
        return querySnapshot(dispatchPrivateEvents, privateHallEvents);
      } else if (user.permissions > 1) {
        console.log('I MEAN ?????');
        return querySnapshot(dispatchPrivateEvents, query);
      }
    }
  }, [user, queryPerms]);

  return (
    <EventsContext.Provider
      value={{
        events,
        formatSubmittedEvent,
        eventTypes,
        halls,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
