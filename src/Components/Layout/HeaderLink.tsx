import React from "react";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

type props = { to: string, title ?: string, children ?: any}
const HeaderLink = ({ to, title, children }: props) => (
  <Nav.Link as="span">
    <Nav.Item>
      <Link className="header-link" to={to}>{children || title}</Link>
    </Nav.Item>
  </Nav.Link>
);

export default HeaderLink;
