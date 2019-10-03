import React, { Fragment } from 'react';

import { Link } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const EditEventNotFound = () => (
  <Fragment>
    <Alert variant="danger">Event not found...</Alert>
    <Link to="/events">
      <Button variant="success" block>Events Page</Button>
    </Link>
  </Fragment>
);

export default EditEventNotFound;