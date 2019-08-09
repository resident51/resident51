import React, { useState, useContext, Fragment } from "react";

import { HallsContext } from "../../../Contexts/HallsContext";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventPublicInput = ({ form: { setFieldValue, values }, field }) => {
  const [selected, setSelected] = useState([]);

  const { halls } = useContext(HallsContext);

  const types = [
    ["any", "Open to anyone"],
    ["complex", "All Halls"],
    ["halls", "Multiple halls"],
    ["hall", "My hall"]
  ];

  return (
    <Fragment>
      <Form.Group>
        <Form.Label as="legend">Who will be attending this event?</Form.Label>
        <Row>
          {types.map(([code, formal]) => (
            <Col key={code} xs={6} lg={3}>
              <Form.Check
                custom
                key={code}
                type="radio"
                label={formal}
                name="publicStatus.type"
                id={`public-${code}`}
                onChange={field.onChange}
                value={code}
                checked={values.publicStatus.type === code}
                required
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
      {values.publicStatus.type === "halls" && (
        <Form.Group>
          <Form.Label as="legend">Which halls?</Form.Label>
          <Row>
            {halls.map(hall => (
              <Col key={hall} sm={6} md={4}>
                <Form.Check
                  custom
                  label={hall}
                  name="publicStatus.halls"
                  id={`public-select-hall-${hall}`}
                  onChange={e => {
                    const i = selected.indexOf(hall)
                    let toChange = [];
                    if(i === -1)
                      toChange = [...selected, e.target.value];
                    else
                      toChange = selected.filter(v => v !== hall);

                    field.onChange(setFieldValue("publicStatus.halls", toChange));
                    setSelected(toChange);
                  }}
                  value={hall}
                  checked={selected.includes(hall)}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>
      )}
    </Fragment>
  );
};

export default EventPublicInput;
