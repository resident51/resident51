import React, { useContext } from "react";

import { EventsContext } from "../Contexts/EventsContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventCreationFAQ from "./EventComponents/EventCreationFAQ";
import EditEventNotFound from './EventComponents/EventNotFound';
import ConfirmRemoveEvent from './EventComponents/ConfirmRemoveEvent';

const RemoveEvent = ({ match, history }) => {
  const { events, dispatchToEvents } = useContext(EventsContext);

  const id = match.params.id;
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
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
          {innerComponent}
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveEvent;