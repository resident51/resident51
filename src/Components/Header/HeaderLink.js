import React from "react";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

const HeaderLink = ({ to, title, children }) => (
  <Nav.Link as="span">
    <Nav.Item>
      <Link className="HeaderLink" to={to}>{children || title}</Link>
    </Nav.Item>
  </Nav.Link>
);

export default HeaderLink;
