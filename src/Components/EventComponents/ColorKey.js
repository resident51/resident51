import React, { useContext } from 'react';

import { EventsContext } from "../../Contexts/EventsContext";

import R51Card from '../R51Card';
import EventTypeButton from './EventTypeButton';

const ColorKey = ({ showState }) => {

  const { eventTypes } = useContext(EventsContext);

  return (
    <R51Card>
      <R51Card.Header>
        View By Event Type
      </R51Card.Header>
      <R51Card.Body className="type-buttons px-1">
        {Object.keys(eventTypes)
          .map(typeData =>
            <EventTypeButton 
              key={typeData} 
              typeState={showState[typeData]} 
              typeData={eventTypes[typeData]} 
            />
          )
        }
      </R51Card.Body>
    </R51Card>
  )
}

export default ColorKey;
