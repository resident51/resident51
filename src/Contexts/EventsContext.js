import React, { useReducer, createContext, useContext, useEffect } from 'react';

import { eventsCollection } from '../Firebase/firebase';
import EventsReducer from '../Reducers/Events.Reducer';

import { UserContext } from './UserContext';

export const eventTypes = {
  social: { formal: "Social Event", color: "green" },
  meeting: { formal: "Meeting", color: "orange" },
  community: { formal: "Community Event", color: "plum" },
  meal: { formal: "Co-Hall Meal", color: "lightcoral" },
  alumni: { formal: "Alumni Event", color: "maroon" },
  campus: { formal: "Campus Event", color: "lightseagreen" }
};

export const halls = [
  "Battenfeld",
  "Douthart",
  "Grace Pearson",
  "KK Amini",
  "Krehbiel",
  "Margaret Amini",
  "Miller",
  "Pearson",
  "Rieger",
  "Sellards",
  "Stephenson",
  "Watkins"
];

export const EventsContext = createContext();

export const EventsProvider = props => {
  const [events, dispatchToEvents] = useReducer(EventsReducer, null);

  const { user } = useContext(UserContext);

  const formatRetrievedEvent = event => {
    event.dateTime = event.dateTime.toDate();

    if(event.publicStatus.type === 'private') {
      if(event.halls.length === 1) {
        event.publicStatus.type = 'hall';
      } else {
        event.publicStatus.type = 'halls';
      }
    } else if (event.publicStatus.type !== 'public') {
      throw new Error("Cloud Firestore error: poorly formatted event map.");
    }
  }

  // Format event before sending to Firebase
  const formatSubmittedEvent = event => {
    const [hour, minute] = event.time.split(':');
    event.dateTime = event.date.hour(+hour).minute(+minute).toDate();
    delete event.date;
    delete event.time;

    if(event.publicStatus.type === 'public') {
      event.publicStatus.halls = halls;
    } else if(event.publicStatus.type === 'halls') {
      event.publicStatus.type = 'private';
    } else if(event.publicStatus.type === 'hall')  {
      event.publicStatus.type = 'private';
      event.publicStatus.halls = [user.hall];
    }
  }

  console.log(user);

  // Set up database subscription, give unsubscribe function to useEffect
  useEffect(() => {
    // Prepare an events collection query specific to the user
    let query;
    if(user === null) {
      // Waiting for user data from Firebase, no need to waste reads
      query = eventsCollection.where("my_fake_field", "==", "some fake string");
    } else if(!user.permissions) {
      // The user is not logged in or not verified      
      query = eventsCollection.where("publicStatus.type", "==", 'public');
    } else if(user.permissions === 1) {
      // The user is logged in, verified, and a resident with default permissions
      query = eventsCollection.where("publicStatus.halls", "array-contains", user.hall);
    } else if(user.permissions > 1) {
      // The user is logged in, verified, and a resident with elevated permissions
      query = eventsCollection;
    }

    // Return the unsubscription function from onSnapshot
    return query.onSnapshot(function (snapshot) {
      if (!snapshot.size) dispatchToEvents({ type: 'EMPTY' });
  
      snapshot.docChanges().forEach(function (change) {
        const event = { ...change.doc.data(), id: change.doc.id };
        formatRetrievedEvent(event);
        
        // Dispatch using the snapshot change type as the action type
        dispatchToEvents({ type: change.type.toUpperCase(), event });
      });
    })
  }, [user]);

  return (
    <EventsContext.Provider value={{
      events, dispatchToEvents, formatSubmittedEvent, eventTypes, halls
    }}>
      {props.children}
    </EventsContext.Provider>
  )
};