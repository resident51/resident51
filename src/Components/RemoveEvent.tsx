import React, { useContext, useState, useEffect } from 'react';

import { EventsContext } from '../Contexts/Events';

import { useHistory, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { eventsCollection } from '../Firebase/firebase';

import EventCreationFAQ from './Events/EventCreationFAQ';
import EventNotFound from './Events/EventNotFound';
import ConfirmRemoveEvent from './Events/ConfirmRemoveEvent';

const RemoveEvent: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | Remove Event';
  }, []);
  const { events } = useContext(EventsContext);
  const [deleting, setDeleting] = useState(false);

  const history = useHistory();
  const { id = '' } = useParams();

  if (events === null) return <h1>Loading event...</h1>;

  const eventToRemove = (events || []).find(e => '' + e.id === '' + id);
  const handleConfirm = (): void => {
    setDeleting(true);
    eventsCollection
      .doc(id)
      .update('publicStatus.type', 'unpublished')
      .then(() => history.push('/events', { update: 'Event removed.', t: Date.now() }))
      .catch(e => {
        console.error(e);
        setDeleting(false);
      });
  };

  const showNotFound = !eventToRemove && !deleting;

  // #TODO change EventCreationFAQ to something less, uh, creation-y
  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          {showNotFound ? (
            <EventNotFound />
          ) : (
            eventToRemove && (
              <ConfirmRemoveEvent
                handleConfirm={handleConfirm}
                handleCancel={(): void => history.push('/events')}
                event={eventToRemove}
              />
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveEvent;
