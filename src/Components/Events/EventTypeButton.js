import React from 'react';

import Button from 'react-bootstrap/Button';

const EventTypeButton = ({ typeState: [picked, setPicked], typeData }) => (
  <Button
    style={{
      backgroundColor: picked ? typeData.color : "white",
      color: picked ? "white" : typeData.color,
      border: "2px solid " + (picked ? "white" : typeData.color),
      margin: "3px"
    }}
    onClick={() => setPicked(!picked)}
  >{typeData.formal}</Button>
);

export default EventTypeButton;