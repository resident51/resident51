import React, { useContext } from 'react';

import { EventType } from '../../Types/';
import { EventTypeFilterState } from '../../Hooks/useEventTypes';

import { EventsContext } from "../../Contexts/Events";

import R51Card from '../Layout/R51Card';
import EventTypeButton from './EventTypeButton';

type ColorKeyProps = { displayTypes: EventTypeFilterState };
const ColorKey = (props: ColorKeyProps) => {
  const { displayTypes } = props;
  const { eventTypes } = useContext(EventsContext);

  return (
    <R51Card>
      <R51Card.Header>
        View By Event Type
      </R51Card.Header>
      <R51Card.Body className="type-buttons px-1">
        {Object.keys(eventTypes)
          .map(type =>
            <EventTypeButton 
              key={type} 
              typeState={displayTypes[type]}
              typeData={eventTypes[type as EventType]}
            />
          )
        }
      </R51Card.Body>
    </R51Card>
  )
}

export default ColorKey;
