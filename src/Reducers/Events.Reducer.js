import uuid from "uuid/v4";

const eventsReducer = (events, action) => {
  switch (action.type) {
    case "ADD":
      return [...events, {...action.event, id: uuid()}]
    case "EDIT":
      return events.map(
        event => event.id === action.id ? 
          {...action.event, id: action.id} : 
          event
      )
    case "DELETE": 
      return events.filter(event => event.id !== action.id )
    default:
      return events;
  }
};

export default eventsReducer;