import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import HeaderLink from "./HeaderLink";

const Header = () => (
  <Navbar collapseOnSelect expand="md" bg="dark" text="light" variant="light">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <HeaderLink to="/" title="Home" />
        <HeaderLink to="/events/">Events</HeaderLink>
        <HeaderLink to="/halls/">Halls</HeaderLink>
        <HeaderLink to="/legacy/">Legacy</HeaderLink>
        <HeaderLink to="/community/">Community</HeaderLink>
        <HeaderLink to="/feedback">Feedback</HeaderLink>
      </Nav>
      <Nav>
        <HeaderLink to="/login/">Log In</HeaderLink>
        <HeaderLink to="/profile/">Profile</HeaderLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
