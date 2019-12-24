import React, { useContext, useEffect } from 'react'

import { UserContext } from "../Contexts/User"

import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import R51Card from "./Layout/R51Card";

import me from '../tests/accounts';

const Profile = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    document.title = "Profile | Resident 51";
    if(user && !user.displayName) {
      history.replace('/login');
    }
  }, [user, history]);

  // Return empty component while waiting for auth
  if(!user) return <div />;

  const status = !user.permissions ? 'Unverified' :
                  user.permissions === 1 ? 'Resident' :
                  user.permissions === 2 ? 'Editor' :
                  user.permissions === 3 ? 'Admin' : 'User';

  const { hall } = me.profile;

  return (
    <Container fluid={!!user}>
      {user === null ? <h1>Loading event...</h1> :
      <Row>
        <Col xs={12} md={4}>
          <Container>
            <h1>{user.displayName}</h1>
            {!!hall && <h3>{hall}</h3>}
            <h3>{status}</h3>
          </Container>
        </Col>
        <Col xs={12} md={7}>
          <Container>
            <h1>Your Dashboard</h1>
          </Container>

          <R51Card>
            <R51Card.Header>Event Drafts</R51Card.Header>
            <R51Card.Body>wow</R51Card.Body>
          </R51Card>
          <R51Card>
            <R51Card.Header>Favorited Events</R51Card.Header>
            <R51Card.Body>great</R51Card.Body>
          </R51Card>
        </Col>
      </Row>}
    </Container>
  )
}

export default Profile;