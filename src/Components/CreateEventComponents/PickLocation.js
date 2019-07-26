import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


import useAccordionToggle from './useAccordionToggle';

const PickLocation = () => {

  return (
    <fieldset>
      <Accordion>
        <Card>
          <TriggerToggle eventKey="find-location">
            <Form.Group>
              <Form.Label as="legend">
                Where will the event be held?
              </Form.Label>
              <Row>
                <Col sm={4}>
                  <Form.Check
                    type="radio"
                    label="In complex"
                    value="scholhalls"
                    name="locationType"
                    id="location-complex"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Check
                    type="radio"
                    value="campus"
                    label="On campus"
                    name="locationType"
                    id="location-campus"
                  />
                </Col>
                <Col sm={4}>
                  <Form.Check
                    type="radio"
                    value="other"
                    label="Elsewhere"
                    name="locationType"
                    id="location-elsewhere"
                  />
                </Col>
              </Row>
            </Form.Group>
          </TriggerToggle>
          <Accordion.Collapse eventKey="find-location">
            <Card.Body>Alright, let's figure out the location</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      
    </fieldset>
  )
}

const TriggerToggle = ({ children, eventKey }) => {
  const dropDetails = useAccordionToggle(eventKey, () =>
    console.log(eventKey)
  );

  return (
    <div type="button" onClick={dropDetails}>
      {children}
    </div>
  );
};

export default PickLocation;