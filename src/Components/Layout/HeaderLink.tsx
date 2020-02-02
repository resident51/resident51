import React from 'react';
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

type props = { to: string };
const HeaderLink: React.FC<props> = ({ to, children }) => (
  <Nav.Link as="span">
    <Nav.Item>
      <Link className="header-link" to={to}>
        {children}
      </Link>
    </Nav.Item>
  </Nav.Link>
);

export default HeaderLink;
