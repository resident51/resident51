import { eventsCollection } from '../Firebase/firebase';

const eventsReducer = (events, action) => {
  if (events === null) events = [];

  switch (action.type) {
    case "EMPTY":
      return events;
    case "ADDED":
      return [...events, action.event];
    case "MODIFIED":
      return events.map(event => {
        if (event.id === action.event.id)
          return { ...action.event, id: action.event.id };
        else
          return event;
      });
    case "REMOVED":
      return events.filter(event => event.id !== action.event.id);
    case "ADD":
      eventsCollection.add(action.event);
      return events;
    case "MODIFY":
      eventsCollection.doc(action.event.id).set(action.event);
      return events;
    case "REMOVE":
      eventsCollection.doc(action.eventId).delete();
      return events;
    default:
      return events;
  }
};

export default eventsReducer;