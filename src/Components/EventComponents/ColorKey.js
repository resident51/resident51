import React, { useContext } from 'react';

import { EventTypesContext } from "../../Contexts/EventTypesContext";

import R51Card from '../R51Card';
import EventTypeButton from './EventTypeButton';

const ColorKey = ({ showState }) => {

  const { eventTypes } = useContext(EventTypesContext);

  return (
    <R51Card>
      <R51Card.Header>
        View By Event Type
      </R51Card.Header>
      <R51Card.Body className="type-buttons">
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
