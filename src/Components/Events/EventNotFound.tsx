import React from 'react';

import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const EditEventNotFound: React.FC = () => (
  <>
    <Alert variant="danger">Event not found...</Alert>
    <Link to="/events">
      <Button variant="success" block>
        Events Page
      </Button>
    </Link>
  </>
);

export default EditEventNotFound;
