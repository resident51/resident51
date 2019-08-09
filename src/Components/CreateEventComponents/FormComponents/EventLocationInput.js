import React, { useState, useContext } from "react";

import { HallsContext } from "../../../Contexts/HallsContext";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventLocationInput = ({ form: { values }, field }) => {
  const [button, setButton] = useState("this is so hacky");
  const { halls } = useContext(HallsContext);

  const locs = [...halls, "Crawford Building", "Complex-wide"];

  return (
    <Form.Group>
      <Form.Label as="legend">Where will this event be located?</Form.Label>
      <Row>
        {locs.map(hall => (
          <Col key={hall} sm={6} md={4}>
            <Form.Check
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
  );
};

export default EventLocationInput;
