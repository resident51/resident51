import React from "react";
import { EventTypeProperties } from "../../Types/";

import Button from "react-bootstrap/Button";

type EventTypeButtonProps = {
  typeState: [boolean, (k: boolean) => void];
  typeData: EventTypeProperties;
};
const EventTypeButton: React.FC<EventTypeButtonProps> = props => {
  const {
    typeState: [picked, setPicked],
    typeData
  } = props;

  return (
    <Button
      style={{
        backgroundColor: picked ? typeData.color : "white",
        color: picked ? "white" : typeData.color,
        border: "2px solid " + (picked ? "white" : typeData.color),
        margin: "3px"
      }}
      onClick={(): void => setPicked(!picked)}
    >
      {typeData.formal}
    </Button>
  );
};

export default EventTypeButton;
