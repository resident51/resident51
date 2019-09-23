import React, { useState, useReducer, createContext, useEffect } from 'react';

import { eventsCollection } from '../Firebase/firebase';
import EventsReducer from '../Reducers/Events.Reducer';

export const EventsContext = createContext();

const initialEventTypes = {
  social: { formal: "Social Event", color: "green" },
  meal: { formal: "Co-Hall Meal", color: "lightcoral" },
  community: { formal: "Community Event", color: "plum" },
  meeting: { formal: "Meeting", color: "orange" },
  alumni: { formal: "Alumni Event", color: "maroon" },
  campus: { formal: "Campus Event", color: "lightseagreen" }
};

export const EventsProvider = props => {

  const [eventTypes, setEventTypes] = useState(initialEventTypes);
  const [events, dispatchToEvents] = useReducer(EventsReducer, null);

  // Set up database subscription, give unsubscribe function to useEffect
  useEffect(() => eventsCollection.onSnapshot(function (snapshot) {
    if (!snapshot.size) dispatchToEvents({ type: 'EMPTY' });

    snapshot.docChanges().forEach(function (change) {
      const event = { ...change.doc.data(), id: change.doc.id };
      event.dateTime = event.dateTime.toDate();

      // Dispatch using the snapshot change type as the action type
      dispatchToEvents({ type: change.type.toUpperCase(), event });
    });
  }), []);

  const formatEventDate = event => {
    const hour = event.time.split(':')[0]
    const minute = event.time.split(':')[1]
    event.dateTime = event.date.hour(+hour).minute(+minute).toDate();
    delete event.date;
    delete event.time;
  }

  return (
    <EventsContext.Provider value={{
      events, dispatchToEvents, formatEventDate, eventTypes, setEventTypes
    }}>
      {props.children}
    </EventsContext.Provider>
  )
};