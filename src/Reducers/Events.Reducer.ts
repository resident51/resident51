import { EventR51, Events } from '../Types/';

export type EventActionType = 'EMPTY' | 'ADDED' | 'MODIFIED' | 'REMOVED';
export type EventAction =
  | { type: 'EMPTY' }
  | { type: 'ADDED'; event: EventR51 }
  | { type: 'MODIFIED'; event: EventR51 }
  | { type: 'REMOVED'; event: EventR51 };

const eventsReducer = (events: Events | null, action: EventAction): Events => {
  // #TODO store events in an object with id key lookup instead of an array.
  const eventsLast = events || [];

  switch (action.type) {
    case 'EMPTY':
      return [];
    case 'ADDED':
      return [...eventsLast, action.event];
    case 'MODIFIED':
      return eventsLast.map(event => {
        if (event.id === action.event.id) return { ...action.event, id: action.event.id };
        else return event;
      });
    case 'REMOVED':
      return eventsLast.filter(event => event.id !== action.event.id);
    default:
      return [...eventsLast];
  }
};

export default eventsReducer;
