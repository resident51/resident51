import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

// import useAccordionToggle from './useAccordionToggle';

const PickLocation = () => {

  return (
    <fieldset>
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
    </fieldset>
  )
}

// const TriggerToggle = ({ children, eventKey }) => {
//   const dropDetails = useAccordionToggle(eventKey, () =>
//     console.log(eventKey)
//   );

//   return (
//     <div type="button" onClick={dropDetails}>
//       {children}
//     </div>
//   );
// };

export default PickLocation;