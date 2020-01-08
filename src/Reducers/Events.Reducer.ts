import { eventsCollection } from "../Firebase/firebase";

import { EventR51, EventId, EventToCFS, Events } from "../Types/";

export type EventActionType =
  | "EMPTY"
  | "ADDED"
  | "MODIFIED"
  | "REMOVED"
  | "ADD"
  | "MODIFY"
  | "REMOVE";
export type EventAction =
  | { type: "EMPTY" }
  | { type: "ADDED"; event: EventR51 }
  | { type: "MODIFIED"; event: EventR51 }
  | { type: "REMOVED"; event: EventR51 }
  | { type: "ADD"; event: EventToCFS }
  | { type: "MODIFY"; event: EventToCFS }
  | { type: "REMOVE"; id: EventId };

const eventsReducer = (events: Events | null, action: EventAction): Events => {
  const eventsLast = events || [];

  switch (action.type) {
    case "EMPTY":
      return eventsLast;
    case "ADDED":
      return [...eventsLast, action.event];
    case "MODIFIED":
      return eventsLast.map(event => {
        if (event.id === action.event.id) return { ...action.event, id: action.event.id };
        else return event;
      });
    case "REMOVED":
      return eventsLast.filter(event => event.id !== action.event.id);
    case "ADD":
      eventsCollection.add(action.event);
      return eventsLast;
    case "MODIFY":
      eventsCollection.doc(action.event.id).set(action.event);
      return eventsLast;
    case "REMOVE":
      eventsCollection.doc(action.id).update("publicStatus.type", "unpublished");
      return eventsLast;
    default:
      return eventsLast;
  }
};

export default eventsReducer;
