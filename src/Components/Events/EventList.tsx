import React, { useContext } from 'react';
import { Events } from '../../Reducers/Events.Reducer';

import { EventTypeFilterState } from '../../Hooks/useEventTypes';

import { EventsContext } from "../../Contexts/Events";

import Accordion from 'react-bootstrap/Accordion';
import Event from './Event';

type EventListProps = { events: Events, displayTypes?: EventTypeFilterState };
const EventList = (props: EventListProps) => {
  const { events, displayTypes } = props;
  const { eventTypes } = useContext(EventsContext);

  if (events === null) {
    return <h5><i>Loading events......</i></h5>
  }

  // Check if any types are being displayed and an event is of that type
  const anyToShow = displayTypes
                    ? Object.values(displayTypes).some(d => d[0]) &&
                      events.some(event => displayTypes[event.type][0])
                    : events.length;

  return anyToShow ?
    <Accordion className='mb-4' >
      {events
        .filter(event => displayTypes ? displayTypes[event.type][0] : true)
        .sort((e1, e2) => e1.dateTime as any - (e2.dateTime as any))
        .map(event =>
          event &&
          <Event
            key={`${event.id}_${event.publicStatus.type}`}
            event={event}
            format={eventTypes[event.type]}
          />)}
    </Accordion> :
    <h5>(No Events to Display)</h5>
};

export default EventList;