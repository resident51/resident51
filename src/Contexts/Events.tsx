import React, { useReducer, createContext, useContext, useEffect } from 'react';

import { CFSEvent, EventToCFS, EventForm as EventFormType, Events, Hall, EventTypeFormats } from '../Types/';

import { currentEvents } from '../Firebase/firebase';
import EventsReducer, { EventAction } from '../Reducers/Events.Reducer';
import { UserContext } from './User';
import {
  formatSubmittedEventByHall,
  formatRetrievedEvent,
  halls,
  eventTypes,
  concatEvents,
} from './EventsProps';

interface EventContextProps {
  events: Events,
  dispatchToEvents: React.Dispatch<EventAction>,
  formatSubmittedEvent: (event: EventFormType) => EventToCFS,
  eventTypes: EventTypeFormats,
  halls: Hall[],
}
export const EventsContext = createContext({} as EventContextProps);

type props = { children: React.ReactNode };

export const EventsProvider = (props: props) => {
  const { user } = useContext(UserContext);
  const [publicEvents, dispatchPublicEvents] = useReducer(EventsReducer, null);
  const [privateEvents, dispatchPrivateEvents] = useReducer(EventsReducer, null);
  const events = concatEvents(publicEvents, privateEvents);

  const hall = user && user.hall;
  const formatSubmittedEvent = formatSubmittedEventByHall(hall || 'Miller'); // #TODO: this is fucking awful
  const queryPerms = user ? user.permissions : -1;

  // #TODO make this even remotely readable.
  const dispatchToEvents: React.Dispatch<EventAction> = (action: EventAction) => {
    if (action.type === 'ADD') {
      if (action.event.publicStatus.type === 'public') {
        dispatchPublicEvents(action);
      } else {
        dispatchPrivateEvents(action);
      }
    } else if (action.type === 'MODIFY') {
      if (publicEvents && publicEvents.filter(e => e.id === action.event.id).length > 0) {
        dispatchPublicEvents(action);
      } else if (privateEvents && privateEvents.filter(e => e.id === action.event.id).length > 0) {
        dispatchPrivateEvents(action);
      }
    } else if (action.type === 'REMOVE') {
      if (publicEvents && publicEvents.filter(e => e.id === action.id).length > 0) {
        dispatchPublicEvents(action);
      } else if (privateEvents && privateEvents.filter(e => e.id === action.id).length > 0) {
        dispatchPrivateEvents(action);
      }
    }
  }

  /**
   * Fetch events from Cloud Firestore based on User's permissions.
   */
  const querySnapshot = (dispatch: React.Dispatch<EventAction>, query: firebase.firestore.Query) => query.onSnapshot(snapshot => {
    if (!snapshot.size) return dispatch({ type: 'EMPTY' });

    snapshot.docChanges().forEach(function (change) {
      // Dispatch using the snapshot change type as the action type
      // #TODO adding every event one by one the first time is easy but causes a lot
      // of renders. Let's get all events at once.
      // #TODO now that we have separate queries for public and private events,
      // we need to have a condition for when an event changes from public to private
      const type = (change.type.toUpperCase() as 'ADDED' | 'MODIFIED' | 'REMOVED');
      const event = { ...change.doc.data(), id: change.doc.id } as CFSEvent;
      const eventFormatted = formatRetrievedEvent(event);
      dispatch({ type, event: eventFormatted });
    });
  });

  // First, query for all public events.
  useEffect(() => {
    const query = currentEvents.where("publicStatus.type", "==", 'public');
    return querySnapshot(dispatchPublicEvents, query);
  }, []);

  // Next, query for all private events available to the user.
  useEffect(() => {
    if (user && user.permissions) {
      const query = currentEvents.where("publicStatus.type", "==", "private");
      if (user.permissions === 1) {
        const privateHallEvents = query.where("publicStatus.halls", "array-contains", user.hall);
        return querySnapshot(dispatchPrivateEvents, privateHallEvents);
      } else if (user.permissions > 1) {
        return querySnapshot(dispatchPrivateEvents, query);
      }
    }
  }, [user, queryPerms]);

  return (
    <EventsContext.Provider value={{
      events, dispatchToEvents, formatSubmittedEvent, eventTypes, halls
    }}>
      {props.children}
    </EventsContext.Provider>
  )
};
