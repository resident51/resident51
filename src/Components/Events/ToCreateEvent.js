import React from 'react';

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import R51Card from '../Layout/R51Card';

const ToCreateEvent = () => (
  <R51Card>
    <R51Card.Header>
      Submit New Event
    </R51Card.Header>
    <R51Card.Body>
      <Link className="create-new" to="/events/create">
        <Button variant="success" block>Create a New Event</Button>
      </Link>
    </R51Card.Body>
  </R51Card>
);

export default ToCreateEvent;