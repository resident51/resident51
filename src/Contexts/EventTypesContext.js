import React, { createContext, useState } from 'react';

export const EventTypesContext = createContext();

export const EventTypesProvider = props => {
  const defaultTypes = {
    social: {
      formal: "Social Event",
      color: "green"
    },
    meal: {
      formal: "Co-Hall Meal",
      color: "lightcoral"
    },
    community: {
      formal: "Community Event",
      color: "plum"
    },
    meeting: {
      formal: "Meeting",
      color: "orange"
    },
    alumni: {
      formal: "Alumni Event",
      color: "maroon"
    },
    campus: {
      formal: "Campus Event",
      color: "lightseagreen"
    }
  };

  const [eventTypes, setEventTypes] = useState(defaultTypes)

  return (
    <EventTypesContext.Provider value={{ eventTypes, setEventTypes }}>
      {props.children}
    </EventTypesContext.Provider>
  )
};

export const giveEventTypesContext = Component => props => (
  <EventTypesProvider>
    <Component {...props} />
  </EventTypesProvider>
)

export const withEventTypesContext = Component => props => (
  <EventTypesContext.Consumer>
    {eventTypes => <Component eventTypesContext={eventTypes} {...props} />}
  </EventTypesContext.Consumer>
);