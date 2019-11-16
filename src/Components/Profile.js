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

const Profile = () => {

  useEffect(() => {
    document.title = "Profile | Resident 51";
  });

  const { events } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  const display = user ? {} : {
    name: user
  }

  const { firstName, lastName, hall, status, major } = me.profile;
  // const { hall: hallExec, ashc: ashcExec, staff } = me.positions;

  const sortEventList = ids => <EventList
    events={events && ids.map(id => events.find(e => e.id === id))}
  />

  const created = sortEventList(me.eventsCreated);
  const favs = sortEventList(me.eventsFavorited);
  const drafted = sortEventList(me.eventsDrafted);

  // // Determine greeting
  // const hour = +(moment().format("HH"));
  // const greet = hour >= 4 && hour < 12 ? "Morning" :
  //   hour >= 12 && hour < 18 ? "Afternoon" : "Evening";

  return (
    <Container fluid={!!user}>
      {user === null ? <h1>Loading event...</h1> :
      <Row>
        <Col xs={12} md={4}>
          <Container>
            <h1>{user.displayName}</h1>
            <h3>{!!hall && `${hall} Hall`}</h3>
            <h3>{status}</h3>
            {major && <h4>{major}</h4>}
          </Container>
          {cReady && <R51Card>
            <R51Card.Header>Your Textbooks</R51Card.Header>
            <R51Card.Body>
              {me.textbooks.map((book) => <div key={book.isbn}>
                <p>
                  <strong>{book.class}</strong> - <i>{book.title}</i>
                </p>
                <p>(ISBN: {book.isbn})</p>
              </div>)}
            </R51Card.Body>
          </R51Card>}
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