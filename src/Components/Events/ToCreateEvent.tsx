import React from "react";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ToCreateEvent: React.FC = () => (
  <Card className="mb-3">
    <Card.Header>Submit New Event</Card.Header>
    <Card.Body>
      <Link className="create-new" to="/events/create">
        <Button variant="success" block>
          Create a New Event
        </Button>
      </Link>
    </Card.Body>
  </Card>
);

export default ToCreateEvent;
