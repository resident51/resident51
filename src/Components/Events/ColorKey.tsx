import React, { useContext } from 'react';

import { EventType } from '../../Types/';
import { EventTypeFilterState } from '../../Hooks/useEventTypes';

import { EventsContext } from '../../Contexts/Events';

import Card from 'react-bootstrap/Card';
import EventTypeButton from './EventTypeButton';

type ColorKeyProps = { displayTypes: EventTypeFilterState };
const ColorKey: React.FC<ColorKeyProps> = props => {
  const { displayTypes } = props;
  const { eventTypes } = useContext(EventsContext);

  return (
    <Card className="mb-3">
      <Card.Header>View By Event Type</Card.Header>
      <Card.Body className="type-buttons px-1">
        {Object.keys(eventTypes).map(type => (
          <EventTypeButton
            key={type}
            typeState={displayTypes[type]}
            typeData={eventTypes[type as EventType]}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default ColorKey;
