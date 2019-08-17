import React, { Fragment } from "react";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventFacilitationInput = ({ 
  form: { values, errors, touched }, 
  field 
}) => {
  const orgs = [
    ["hall", "My Hall"],
    ["ASHC", "ASHC"],
    ["staff", "Hall Staff"],
    ["committee", "Schol-Hall Committee"],
    ["campus", "The University"],
    ["other", "Another Organization"]
  ];

  return (
    <Fragment>
      <Form.Group>
        <Form.Label>Who will be organizing this event?</Form.Label>
        <Row>
          {orgs.map(([code, formal]) => (
            <Col key={code} xs={6} xl={4}>
              <Form.Check
                custom
                type="radio"
                label={formal}
                name="facilitation.organizationType"
                id={`facilitation-organizationType-${code}`}
                onChange={field.onChange}
                value={code}
                checked={values.facilitation.organizationType === code}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
      {(values.facilitation.organizationType === "other" ||
        values.facilitation.organizationType === "committee") && (
        <Form.Group>
          <Form.Label>
            {values.facilitation.organizationType === "committee"
              ? "Which committee?"
              : "What organization?"}
          </Form.Label>
          <Row>
            <Col xs={10}>
              <Form.Control
                name="facilitation.organizationName"
                maxLength={50}
                onChange={field.onChange}
                value={values.facilitation.organizationName}
                type="text"
                placeholder={values.facilitation.organizationType === "committee" ?
                'Examples: "Environmental Committee", "Community Service Committee"' :
                'Examples: "Alumni Association", "KJHK"'}
              />
            </Col>
          </Row>
        </Form.Group>
      )}
      
      { errors.facilitation && errors.facilitation.organizationType && 
        touched.facilitation && touched.facilitation.organizationType && (
        <Alert variant={"danger"}>{errors.facilitation.organizationType}</Alert>
      )}
      { errors.facilitation && errors.facilitation.organizationName && 
        touched.facilitation && touched.facilitation.organizationName && (
        <Alert variant={"danger"}>{errors.facilitation.organizationName}</Alert>
      )}
    </Fragment>
  );
};

export default EventFacilitationInput;
