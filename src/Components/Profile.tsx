import React, { useContext, useEffect } from 'react';

import { UserContext } from '../Contexts/User';

import { useHistory, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VerificationRequests from './Auth/VerificationRequests';

const Profile: React.FC = () => {
  useEffect(() => {
    document.title = 'Resident 51 | Profile';
  }, []);
  const { user } = useContext(UserContext);

  console.log(user);
  const history = useHistory();
  useEffect(() => {
    if (user && !user.displayName) {
      history.replace('/login');
    }
  }, [user, history]);

  // Return empty component while waiting for auth
  if (!user) return <div />;

  const { permissions } = user;
  const status = !permissions
    ? 'Unverified'
    : permissions === 1
    ? 'Resident'
    : permissions === 2
    ? 'Editor'
    : permissions === 3
    ? 'Admin'
    : 'User';

  return (
    <Container fluid={!!user}>
      {user === null ? (
        <h1>Loading...</h1>
      ) : (
        <Row>
          <Col xs={12} md={4}>
            <Container>
              <Row>
                <Col>
                  <h1>{user.displayName}</h1>
                  <h3>{user.hall || <i>No hall selected</i>}</h3>
                  <h3>{status}</h3>
                  {permissions === 0 && (
                    <p>
                      <i>
                        If you haven't already, <Link to="/first-login">request verification</Link>.
                      </i>
                    </p>
                  )}
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
            {!!permissions && permissions >= 3 ? (
              <VerificationRequests />
            ) : (
              <Row className="justify-content-center">
                <Col className="text-center" xs={12}>
                  <i className="lead">(We're still working on this part!)</i>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
