import React, { useContext, useEffect } from 'react';

import { UserContext } from '../Contexts/User';

import { useHistory, Link } from 'react-router-dom';

import { verifyUser } from '../Firebase/firebase';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import R51Card from "./Layout/R51Card";

const Profile = () => {
  const { user, usersRequestingVerification } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    document.title = "Profile | Resident 51";
    if (user && !user.displayName) {
      history.replace('/login');
    }
  }, [user, history]);

  // Return empty component while waiting for auth
  if (!user) return <div />;

  const { displayName, hall, permissions } = user;

  const status = !permissions ? 'Unverified' :
    permissions === 1 ? 'Resident' :
      permissions === 2 ? 'Editor' :
        permissions === 3 ? 'Admin' : 'User';

  const verifyLink = <p><i>If you haven't already, <Link to="/first-login">request verification</Link>.</i></p>
  const optionalLink = !permissions ? verifyLink : <span />;

  const sideHeader = (
    <Container>
      <Row>
        <Col>
          <h1>{displayName}</h1>
          <h3>{!!hall ? hall : <i>No hall selected</i>}</h3>
          <h3>{status}</h3>
          {optionalLink}
        </Col>
      </Row>
    </Container>
  );

  const verificationRequests = !!permissions && permissions >= 3 && (
    <R51Card>
      <R51Card.Header>Verification Requests</R51Card.Header>
      <R51Card.Body>
        {usersRequestingVerification.length ?
        <ul>
          {usersRequestingVerification.map(request => (
            <li key={request.uid}>
              <span className="lead">{request.displayName}</span>
              <Button onClick={() => verifyUser({ email: request.email })}>Verify</Button>
            </li>
          ))}
        </ul> : 'No requests.'}
      </R51Card.Body>
    </R51Card>
  );

  return (
    <Container fluid={!!user}>
      {user === null ? <h1>Loading...</h1> :
        <Row>
          <Col xs={12} md={4}>
            {sideHeader}
          </Col>
          <Col xs={12} md={7}>
            <Container>
              <h1>Your Dashboard</h1>
            </Container>
            {verificationRequests}
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