import React, { useContext, Fragment } from "react";

import { UserContext } from '../../Contexts/UserContext';

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import HeaderLink from "./HeaderLink";

const Header = () => {

  const { user } = useContext(UserContext);

  let userNav = <div />

  if (user && user.uid) {
    userNav = (
      <Fragment>
        <HeaderLink to="/profile/">Profile</HeaderLink>
        <HeaderLink to="/logout/">Log Out</HeaderLink>
      </Fragment>
    )
  } else if (user !== null) {
    userNav = <HeaderLink to="/login/">Log In</HeaderLink>
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-3">
      <Container fluid="true" className="my-auto">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <HeaderLink to="/" title="Home" />
            <HeaderLink to="/events/">Events</HeaderLink>
            <HeaderLink to="/feedback">Feedback</HeaderLink>
          </Nav>
          <Nav>
            {userNav}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;
