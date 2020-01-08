import React from "react";

import { EventR51 } from "../../Types/";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventList from "./EventList";

type ConfirmRemoveEventProps = {
  handleConfirm: () => void;
  handleCancel: () => void;
  event: EventR51;
};
const ConfirmRemoveEvent: React.FC<ConfirmRemoveEventProps> = props => {
  const { handleConfirm, handleCancel, event } = props;
  return (
    <>
      <h1>Delete this event?</h1>
      <EventList events={[event]} />
      <Row className="justify-content-end">
        <Col xs md="auto" className="ml-auto">
          <Button size="lg" onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </Col>
        <Col md="auto" className="ml-0">
          <Button size="lg" onClick={handleConfirm} variant="danger">
            Delete Event
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ConfirmRemoveEvent;
