import React, { useReducer, createContext, useContext, useEffect } from 'react';

import { CFSEvent, EventToCFS, EventFormValidated } from '../Types/';

import { currentEvents } from '../Firebase/firebase';
import EventsReducer, { Events, EventAction } from '../Reducers/Events.Reducer';
import { UserContext } from './User';
import {
  formatSubmittedEventByHall,
  formatRetrievedEvent,
  halls,
  eventTypes
} from './EventsProps';

export const EventsContext = createContext({
  events: null as Events,
  dispatchToEvents: (
    (action: { type: string, data: object }): void => { }
  ) as React.Dispatch<EventAction>,
  // formatSubmittedEvent: (event: EventFormValidated): EventToCFS => ({} as EventToCFS), // (event?: EventFormValidated): EventToCFS | void => ({} as EventToCFS),
  eventTypes,
  halls,
});

type props = { children: React.ReactNode };

export const EventsProvider = (props: props) => {
  const [events, dispatchToEvents] = useReducer(EventsReducer, null); // <Event[]>

  const { user } = useContext(UserContext);

  const hall = user && user.hall;
  const formatSubmittedEvent = !!hall ? formatSubmittedEventByHall(hall) : (() => {});

  /**
   * Fetch events from Cloud Firestore based on User's permissions.
   */
  const querySnapshot = (query: firebase.firestore.Query) => query.onSnapshot(snapshot => {
    if (!snapshot.size) return dispatchToEvents({ type: 'EMPTY' });

    snapshot.docChanges().forEach(function (change) {
      // Dispatch using the snapshot change type as the action type
      // #TODO adding every event one by one the first time is easy but causes a lot
      // of renders. Let's get all events at once.
      // #TODO now that we have separate queries for public and private events,
      // we need to have a condition for when an event changes from public to private
      const type = (change.type.toUpperCase() as 'ADDED' | 'MODIFIED' | 'REMOVED');
      const event = { ...change.doc.data(), id: change.doc.id } as CFSEvent;
      const eventFormatted = formatRetrievedEvent(event);
      dispatchToEvents({ type, event: eventFormatted });
    });
  });

  // First, query for all public events.
  useEffect(() => {
    const query = currentEvents.where("publicStatus.type", "==", 'public');
    return querySnapshot(query);
  }, []);

  // Next, query for all private events available to the user.
  useEffect(() => {
    if(user && user.permissions) {
      const query = currentEvents.where("publicStatus.type", "==", "private");
      if(user.permissions === 1) {
        return querySnapshot(query.where("publicStatus.halls", "array-contains", user.hall));
      } else if (user.permissions > 1) {
        return querySnapshot(query);
      }
    }
  }, [user]);

  return (
    <EventsContext.Provider value={{
      events, dispatchToEvents, formatSubmittedEvent, eventTypes, halls
    }}>
      {props.children}
    </EventsContext.Provider>
  )
};
