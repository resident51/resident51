import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";
import R51Card from "./R51Card";

const EventSubmitted = () => {
  return (
    <Container fluid={true}>
      <h1>Well look at you!</h1>
      <R51Card>
        <R51Card.Header>Form feedback.</R51Card.Header>
        <R51Card.Body>
          We're looking for feedback on this form! Tell us what's missing or
          could be improved:
          <Link target="none" to="/feedback">
            <Button variant="success" block>
              Provide Website Feedback
            </Button>
          </Link>
        </R51Card.Body>
      </R51Card>
    </Container>
  );
};

export default EventSubmitted;
