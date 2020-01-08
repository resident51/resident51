import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFound: React.FC = () => (
  <Container>
    <Row>
      <Col className="justify-contents-center">
        <h1>Error: Page not found!</h1>
        <Link to="/">Go Home</Link>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
