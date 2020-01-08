import React from "react";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

type props = { to: string; title?: string };
const HeaderLink: React.FC<props> = ({ to, title, children }) => (
  <Nav.Link as="span">
    <Nav.Item>
      <Link className="header-link" to={to}>
        {children || title}
      </Link>
    </Nav.Item>
  </Nav.Link>
);

export default HeaderLink;
