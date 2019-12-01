import React, { useReducer, createContext, useContext, useEffect } from 'react';

import { currentEvents } from '../Firebase/firebase';
import EventsReducer from '../Reducers/Events.Reducer';

import { UserContext } from './UserContext';

import { formatSubmittedEventByHall, formatRetrievedEvent, halls, eventTypes } from './EventsContextProps';

export const EventsContext = createContext();

export const EventsProvider = props => {
  const [events, dispatchToEvents] = useReducer(EventsReducer, null);

  const { user } = useContext(UserContext);

  const hall = user && user.hall;
  const formatSubmittedEvent = formatSubmittedEventByHall(hall);

  /**
   * Fetch events from Cloud Firestore based on User's permissions.
   * @param {firebase.firestore.Query} query Events query to Cloud Firestore
   */
  const querySnapshot = query => query.onSnapshot(function (snapshot) {
    if (!snapshot.size) return dispatchToEvents({ type: 'EMPTY' });

    snapshot.docChanges().forEach(function (change) {
      // Dispatch using the snapshot change type as the action type
      // #TODO adding every event one by one the first time is easy but causes a lot
      // of renders. Let's get all events at once.
      // #TODO now that we have separate queries for public and private events,
      // we need to have a condition for when an event changes from public to private
      const event = { ...change.doc.data(), id: change.doc.id };
      formatRetrievedEvent(event);
      dispatchToEvents({ type: change.type.toUpperCase(), event });
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