import React, { useContext } from "react";

import { EventsContext } from "../Contexts/Events";

import { useHistory, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventCreationFAQ from "./Events/EventCreationFAQ";
import EventNotFound from "./Events/EventNotFound";
import ConfirmRemoveEvent from "./Events/ConfirmRemoveEvent";

const RemoveEvent: React.FC = () => {
  const { events, dispatchToEvents } = useContext(EventsContext);

  const history = useHistory();
  const { id = "" } = useParams();

  if (events === null) return <h1>Loading event...</h1>;

  const eventToRemove = (events || []).find(e => "" + e.id === "" + id);
  const handleConfirm = (): void => {
    dispatchToEvents({ type: "REMOVE", id });
    history.push("/events", { update: "Event removed." });
  };

  // #TODO change EventCreationFAQ to something less, uh, creation-y
  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          {eventToRemove ? (
            <ConfirmRemoveEvent
              handleConfirm={handleConfirm}
              handleCancel={(): void => history.push("/events")}
              event={eventToRemove}
            />
          ) : (
            <EventNotFound />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveEvent;
