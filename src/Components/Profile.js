import React, { useContext, useEffect } from 'react'

import { EventsContext } from "../Contexts/EventsContext"
import { UserContext } from "../Contexts/UserContext"

// import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventList from './EventComponents/EventList';
import R51Card from "./R51Card";

import me from '../tests/accounts';

const cReady = true;
const LOADING = 'Loading...';

const Profile = ({ history }) => {

  useEffect(() => {
    document.title = "Profile | Resident 51";
    if(user && !user.displayName) {
      history.replace('/login');
    }
  }, [user]);

  const { events } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  // Return empty component while waiting for auth
  if(!user) return;

  const status = !user.permissions ? 'Unverified' :
                  user.permissions === 1 ? 'Resident' :
                  user.permissions === 2 ? 'Editor' :
                  user.permissions === 3 ? 'Admin' : 'User';

  const { hall } = me.profile;
  // const { hall: hallExec, ashc: ashcExec, staff } = me.positions;

  const sortEventList = ids => <EventList
    events={events && ids.map(id => events.find(e => e.id === id))}
  />

  const favs = sortEventList(me.eventsFavorited);
  const drafted = sortEventList(me.eventsDrafted);

  return (
    <Container fluid={!!user}>
      {user === null ? <h1>Loading event...</h1> :
      <Row>
        <Col xs={12} md={4}>
          <Container>
            <h1>{user.displayName}</h1>
            {!!hall && <h3>{`${hall} Hall`}</h3>}
            <h3>{status}</h3>
          </Container>
        </Col>
        <Col xs={12} md={cReady ? 7 : 12}>
          <Container>
            <h1>Your Dashboard</h1>
          </Container>

          <R51Card>
            <R51Card.Header>Event Drafts</R51Card.Header>
            <R51Card.Body>{drafted}</R51Card.Body>
          </R51Card>
          <R51Card>
            <R51Card.Header>Favorited Events</R51Card.Header>
            <R51Card.Body>{favs}</R51Card.Body>
          </R51Card>
          <R51Card>
            <R51Card.Header>Events You Created</R51Card.Header>
            <R51Card.Body>{created}</R51Card.Body>
          </R51Card>
        </Col>
      </Row>}
    </Container>
  )
}

export default Profile;