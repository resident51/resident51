import React from 'react';

import { PublicStatusFilterState } from '../../Hooks/usePublicStatusFilter';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

type PublicStatusFilterProps = { publicStatusFilters: PublicStatusFilterState };
const PublicStatusFilter: React.FC<PublicStatusFilterProps> = props => {
  const filters = props.publicStatusFilters;
  const [showPublic, setShowPublic] = filters.public;
  const [showPrivate, setShowPrivate] = filters.private;

  return (
    <Card className="mb-3">
      <Card.Header>View By Public Status</Card.Header>
      <Card.Body className="px-1">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Form.Check
              label="Public events"
              name="public-events"
              id="public-events-filter"
              onChange={(): void => setShowPublic(!showPublic)}
              value="public"
              checked={showPublic}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              label="Private events"
              name="private-events"
              id="private-events-filter"
              onChange={(): void => setShowPrivate(!showPrivate)}
              value="private"
              checked={showPrivate}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PublicStatusFilter;
