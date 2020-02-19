import React, { useContext } from 'react';

import { EventsContext } from '../Contexts/Events';
import { UserContext } from '../Contexts/User';

import useDocumentTitle from '../Hooks/useDocumentTitle';
import useEventTypeFilter from '../Hooks/useEventTypeFilter';
import usePublicStatusFilter from '../Hooks/usePublicStatusFilter';

import { useHistory } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ColorKey from './Events/ColorKey';
import PublicStatusFilter from './Events/PublicStatusFilter';
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

  const displayTypes = useEventTypeFilter();
  const publicStatusFilters = usePublicStatusFilter();

  // Show updates from history state API when events are mutated
  const history = useHistory();
  const update = showUpdate(history.location.state);

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center px-lg-4 px-md-2">
        <Col md={{ span: 8, order: 2 }}>
          <h1 className="text-center mb-4">Schol-Hall Events</h1>
        </Col>
        <Col className="pt-md-4" md={{ span: 4, order: 1 }}>
          <h4 className="text-center">Filter Visible Events</h4>
        </Col>
      </Row>
      <Row className="justify-content-md-center px-lg-4 px-md-2">
        <Col sm={12} md={4}>
          <ColorKey displayTypes={displayTypes} />
          {user.permissions > 0 && <PublicStatusFilter publicStatusFilters={publicStatusFilters} />}
          {user.permissions > 1 && <ToCreateEvent />}
        </Col>
        <Col sm={12} md={8}>
          {update && <Alert variant="success">{update}</Alert>}
          <EventList
            events={events}
            displayTypes={displayTypes}
            publicStatusFilters={publicStatusFilters}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
