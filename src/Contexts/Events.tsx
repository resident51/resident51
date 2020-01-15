import React, { useReducer, createContext, useContext, useEffect } from "react";

import {
  CFSEvent,
  EventToCFS,
  EventToCFSSubmission,
  EventForm as EventFormType,
  Events,
  Hall,
  EventTypeFormats
} from "../Types/";

import { currentEvents } from "../Firebase/firebase";
import EventsReducer, { EventAction } from "../Reducers/Events.Reducer";
import { UserContext } from "./User";
import {
  formatSubmittedEventByHall,
  formatRetrievedEvent,
  halls,
  eventTypes,
  concatEvents
} from "./EventsProps";

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
  const formatSubmittedEvent = formatSubmittedEventByHall(hall || "Miller"); // #TODO: this is fucking awful
  const queryPerms = user ? user.permissions : -1;

  /**
   * Fetch events from Cloud Firestore based on User's permissions.
   */
  const querySnapshot = (
    dispatch: React.Dispatch<EventAction>,
    query: firebase.firestore.Query
  ): (() => void) =>
    query.onSnapshot(snapshot => {
      if (!snapshot.size) return dispatch({ type: "EMPTY" });

      snapshot.docChanges().forEach(function(change) {
        // Dispatch using the snapshot change type as the action type
        // #TODO adding every event one by one the first time is easy but causes a lot
        // of renders. Let's get all events at once.
        // #TODO now that we have separate queries for public and private events,
        // we need to have a condition for when an event changes from public to private
        const type = change.type.toUpperCase() as "ADDED" | "MODIFIED" | "REMOVED";
        const event = {
          ...change.doc.data({ serverTimestamps: "estimate" }),
          id: change.doc.id
        } as CFSEvent;
        const eventFormatted = formatRetrievedEvent(event);
        dispatch({ type, event: eventFormatted });
      });
    });

  // First, query for all public events.
  useEffect(() => {
    const query = currentEvents.where("publicStatus.type", "==", "public");
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
    <EventsContext.Provider
      value={{
        events,
        formatSubmittedEvent,
        eventTypes,
        halls
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
