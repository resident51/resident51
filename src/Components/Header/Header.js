import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import HeaderLink from "./HeaderLink";

const Header = () => (
  <Navbar collapseOnSelect expand="md" bg="dark" text="light" variant="light">
    <HeaderLink to="/" title="Home" />
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as="span" text="light">
          <HeaderLink to="/events/">Events</HeaderLink>
        </Nav.Link>
        <Nav.Link as="span">
          <HeaderLink to="/halls/">Halls</HeaderLink>
        </Nav.Link>
        <Nav.Link as="span">
          <HeaderLink to="/legacy/">Legacy</HeaderLink>
        </Nav.Link>
        <Nav.Link as="span">
          <HeaderLink to="/community/">Community</HeaderLink>
        </Nav.Link>
        <Nav.Link as="span">
          <HeaderLink to="/feedback">Feedback</HeaderLink>
        </Nav.Link>
      </Nav>
      <Nav>
        <HeaderLink to="/login/">Log In</HeaderLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
