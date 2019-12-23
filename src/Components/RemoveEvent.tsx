import React, { useContext, useEffect } from "react";

import { EventsContext } from "../Contexts/Events";

import { useHistory, useParams } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventCreationFAQ from "./Events/EventCreationFAQ";
import EditEventNotFound from './Events/EventNotFound';
import ConfirmRemoveEvent from './Events/ConfirmRemoveEvent';

const RemoveEvent = () => {
  useEffect(() => {
    document.title = "Remove Event | Resident 51";
  });

  const history = useHistory();

  const { events, dispatchToEvents } = useContext(EventsContext);

  const { id = '' } = useParams();
  const eventToRemove = (events || []).find(e => '' + e.id === '' + id);

  const handleConfirm = () => {
    dispatchToEvents({ type: 'REMOVE', id });
    history.push("/events", { update: 'Event removed.' });
  }

  const handleCancel = () => {
    history.push("/events");
  }

  const innerComponent = (events === null)
  ? <h1>Loading event...</h1>
  : eventToRemove ? <ConfirmRemoveEvent handleConfirm={handleConfirm}
                                        handleCancel={handleCancel}
                                        event={eventToRemove}/>
                  : <EditEventNotFound /> ;

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          {innerComponent}
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveEvent;