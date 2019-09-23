import React, { useState, useEffect, useContext, Fragment } from "react";

import { HallsContext } from "../../Contexts/HallsContext";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventLocationInput = ({
  form: { values, errors, touched },
  field
}) => {
  const [button, setButton] = useState("this is so hacky");
  const { halls } = useContext(HallsContext);

  const locs = [...halls, "Crawford Building", "Complex-wide"];

  // Allow 'other' box to get location value if editing and it isn't a hall
  useEffect(() => {
    if(values.location && !locs.includes(values.location)) 
      setButton('');
  }, []);

  return (
    <Fragment>
      <Form.Group>
        <Form.Label as="legend">Where will this event be located?</Form.Label>
        <Row>
          {locs.map(hall => (
            <Col key={hall} sm={6} lg={4}>
              <Form.Check
                required
                custom
                type="radio"
                label={hall}
                name="location"
                id={`location-hall-${hall}`}
                onChange={e => {
                  setButton(e.target.value);
                  field.onChange(e);
                }}
                value={hall}
                checked={button === hall}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col sm={2} className="i-need-some-space-man">
            <Form.Check
              custom
              type="radio"
              id="location-other"
              label="Other: "
              name="location"
              required
              onChange={e => {
                field.onChange(e);
                setButton(e.target.value);
              }}
              value=""
              checked={button === ""}
            />
          </Col>
          <Col xs={12} sm={9} className="i-need-some-space-man">
            <Form.Control
              required
              disabled={!(button === "")}
              name="location"
              maxLength={50}
              onChange={field.onChange}
              value={button === "" ? values.location : ""}
              type="text"
              placeholder={'Examples: "Memorial Union", "Crawford Fountain"'}
            />
          </Col>
        </Row>
      </Form.Group>
      {errors.location && touched.location && (
        <Alert variant={"danger"}>{errors.location}</Alert>
      )}
    </Fragment>
  );
};

export default EventLocationInput;
