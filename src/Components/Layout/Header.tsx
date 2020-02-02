import React, { useContext } from 'react';

import { UserContext } from '../../Contexts/User';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import HeaderLink from './HeaderLink';

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const action =
    user === null ? (
      <div />
    ) : user && user.uid ? (
      <HeaderLink to="/profile/">Profile</HeaderLink>
    ) : (
      <HeaderLink to="/login/">Log In</HeaderLink>
    );

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-3">
      <Container fluid className="my-auto">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <HeaderLink to="/events/">Events</HeaderLink>
            <HeaderLink to="/feedback">Feedback</HeaderLink>
          </Nav>
          <Nav>{action}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
