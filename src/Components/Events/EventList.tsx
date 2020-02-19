import React, { useContext } from 'react';
import { Events, EventR51 } from '../../Types';

import { EventsContext } from '../../Contexts/Events';
import { UserContext } from '../../Contexts/User';

import { EventTypeFilterState } from '../../Hooks/useEventTypeFilter';
import { PublicStatusFilterState } from '../../Hooks/usePublicStatusFilter';

import Accordion from 'react-bootstrap/Accordion';
import Event from './Event';

import { canUpdateEvent } from '../../Utils';

type EventListProps = {
  events: Events;
  displayTypes?: EventTypeFilterState;
  publicStatusFilters?: PublicStatusFilterState;
};
const EventList: React.FC<EventListProps> = props => {
  const { events, displayTypes, publicStatusFilters } = props;
  const { eventTypes } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  if (events === null) {
    return (
      <h5>
        <i>Loading events......</i>
      </h5>
    );
  }

  const eventsFiltered = events.filter(event => {
    const passesTypeFilter = displayTypes ? displayTypes[event.type][0] : true;
    if (!passesTypeFilter) return false;

    const publicType = event.publicStatus.type === 'public' ? 'public' : 'private';
    return publicStatusFilters ? publicStatusFilters[publicType][0] : true;
  });

  return eventsFiltered.length ? (
    <Accordion className="mb-4">
      {eventsFiltered
        .sort((e1: EventR51, e2: EventR51) => e1.dateTime - e2.dateTime)
        .map(
          event =>
            event && (
              <Event
                canModerate={canUpdateEvent(event.publicStatus, user)}
                key={`${event.id}_${event.publicStatus.type}`}
                event={event}
                format={eventTypes[event.type]}
              />
            ),
        )}
    </Accordion>
  ) : (
    <h5>(No Events to Display)</h5>
  );
};

export default EventList;
