import React, { useContext } from 'react';

import { EventsContext } from '../Contexts/Events';
import { UserContext } from '../Contexts/User';

import useEventTypes from '../Hooks/useEventTypes';
import useDocumentTitle from '../Hooks/useDocumentTitle';

import { useHistory } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ColorKey from './Events/ColorKey';
import ToCreateEvent from './Events/ToCreateEvent';
import EventList from './Events/EventList';

const showUpdate = (historyState: { t?: number; update?: string }): string | void => {
  if (historyState && typeof historyState.t === 'number') {
    if (Date.now() - historyState.t < 1000 * 60) {
      return historyState.update;
    }
  }
};

const Events: React.FC = () => {
  useDocumentTitle('Resident 51 | Events');
  const { events } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  const displayTypes = useEventTypes();

  // Show updates from history state API when events are mutated
  const history = useHistory();
  const update = showUpdate(history.location.state);

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-end">
        <Col md={8}>
          <h1 className="text-center mb-4">Schol-Hall Events</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center px-lg-4 px-md-2">
        <Col sm={12} md={4}>
          <ColorKey displayTypes={displayTypes} />
          {user.permissions > 1 && <ToCreateEvent />}
        </Col>
        <Col sm={12} md={8}>
          {update && <Alert variant="success">{update}</Alert>}
          <EventList events={events} displayTypes={displayTypes} />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
