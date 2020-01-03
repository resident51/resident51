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

  return (
    <Container fluid={!!user}>
      {user === null ? <h1>Loading...</h1> :
        <Row>
          <Col xs={12} md={4}>
            <Container>
              <Row>
                <Col>
                  <h1>{displayName}</h1>
                  <h3>{!!hall ? hall : <i>No hall selected</i>}</h3>
                  <h3>{status}</h3>
                  {!!permissions && verifyLink}
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={12} md={7}>
            <Container>
              <h1 className="text-center mb-4">
                {user.permissions > 2 ? 'Admin' : 'Your'} Dashboard
              </h1>
            </Container>
            {(() => {
              if (!!permissions && permissions) {
                return (
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
                )
              } else {
                return (
                  <Row className="justify-content-center">
                    <Col className="text-center" xs={12}>
                      <i className="lead">
                        We're still working on this part! But uhhh... did we mention you look great today?
                      </i>
                    </Col>
                  </Row>
                )
              }
            })()}
          </Col>
        </Row>}
    </Container>
  )
}

export default Profile;