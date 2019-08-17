import React, { createContext, useReducer } from 'react';

import EventsReducer from '../Reducers/Events.Reducer';
import allEvents from '../tests/events';

export const EventsContext = createContext();

export const EventsProvider = props => {
  const defaultEvents = allEvents;

  const [events, dispatchToEvents] = useReducer(EventsReducer, defaultEvents);

  return (
    <EventsContext.Provider value={{ events, dispatchToEvents }}>
      {props.children}
    </EventsContext.Provider>
  )
};