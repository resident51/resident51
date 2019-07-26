import React, { createContext, useState } from 'react';

import allEvents from '../tests/events';

export const EventsContext = createContext();

export const EventsProvider = props => {
  const defaultEvents = allEvents;

  const [events, setEvents] = useState(defaultEvents)

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {props.children}
    </EventsContext.Provider>
  )
};

export const giveEventsContext = Component => props => (
  <EventsProvider>
    <Component {...props} />
  </EventsProvider>
)

export const withEventsContext = Component => props => (
  <EventsContext.Consumer>
    {events => <Component eventsContext={events} {...props} />}
  </EventsContext.Consumer>
);