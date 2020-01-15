import React, { useContext } from "react";
import { Events, EventR51, Hall, EventFormPublicType } from "../../Types";

import { EventsContext } from "../../Contexts/Events";
import { UserContext } from "../../Contexts/User";

import { EventTypeFilterState } from "../../Hooks/useEventTypes";

import Accordion from "react-bootstrap/Accordion";
import Event from "./Event";

type EventListProps = { events: Events; displayTypes?: EventTypeFilterState };
const EventList: React.FC<EventListProps> = props => {
  const { events, displayTypes } = props;
  const { eventTypes } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  if (events === null) {
    return (
      <h5>
        <i>Loading events......</i>
      </h5>
    );
  }

  const canUpdate = ({ type, halls }: { type: EventFormPublicType; halls: Hall[] }): boolean => {
    if (!user || !user.permissions || user.permissions < 2 || !user.hall) {
      return false;
    } else if (type === "public" && user.permissions === 3) {
      return true;
      // #TODO Provide support for user roles, eg. ASHC, Community service committee, etc.
    } else if ((type === "hall" || type === "halls") && halls.includes(user.hall)) {
      return true;
    }
    return false;
  };

  // Check if any types are being displayed and an event is of that type
  const anyToShow = displayTypes
    ? Object.values(displayTypes).some(d => d[0]) &&
      events.some(event => displayTypes[event.type][0])
    : events.length;

  return anyToShow ? (
    <Accordion className="mb-4">
      {events
        .filter(event => (displayTypes ? displayTypes[event.type][0] : true))
        .sort((e1: EventR51, e2: EventR51) => e1.dateTime - e2.dateTime)
        .map(
          event =>
            event && (
              <Event
                canUpdate={canUpdate}
                key={`${event.id}_${event.publicStatus.type}`}
                event={event}
                format={eventTypes[event.type]}
              />
            )
        )}
    </Accordion>
  ) : (
    <h5>(No Events to Display)</h5>
  );
};

export default EventList;
