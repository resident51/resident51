// import React, { useState, useEffect, useContext, Fragment } from "react";
import React, { useState, useEffect, Fragment, useContext } from "react";

import { EventsContext } from "../../Contexts/EventsContext";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EventLocationInput = ({
  form: { values, errors, touched },
  field
}) => {
  const { halls } = useContext(EventsContext);
  const locs = [...halls, "Crawford Building", "Complex-wide"];

  // `otherText` is its own variable because we want the input text
  // to remain populated even if another option is clicked.
  const [otherEnabled, setOtherEnabled] = useState(false);
  const [otherText, setOtherText] = useState('');

  // On first render, get initial location input and set first state
  useEffect(() => {
    const otherIsChecked = values.location && !locs.includes(values.location);

    setOtherEnabled(otherIsChecked);
    setOtherText(otherIsChecked ? values.location : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const otherEnabledNote = otherEnabled &&
    <p className="mt-1 font-italic font-weight-light small">
      *Note: if your event is somewhere like "Reiger dining room" or "Crawford fountain",
      it's better to use the options above. Provide details in your description instead!
    </p>

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
                  field.onChange(e);
                  setOtherEnabled(false);
                }}
                value={hall}
                checked={!otherEnabled && values.location === hall}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col sm={'auto'} className="mt-2 pr-2">
            <Form.Check
              custom
              type="radio"
              id="location-other"
              label="Other: "
              name="location"
              required
              onChange={e => {
                field.onChange(e);
                setOtherEnabled(true);
              }}
              value={otherText /* field.onChange is passed otherText when selecting 'other' */ }
              checked={otherEnabled}
            />
          </Col>
          <Col className="pt-1">
            <Form.Control
              required
              disabled={!otherEnabled}
              name="location"
              maxLength={50}
              onChange={e => {
                field.onChange(e);
                setOtherText(e.target.value);
              }}
              value={otherText}
              type="text"
              placeholder={'Examples: "Strong Hall", "Memorial Stadium"'}
            />
          </Col>
        </Row>
        {otherEnabledNote}
      </Form.Group>
      {errors.location && touched.location && (
        <Alert variant={"danger"}>{errors.location}</Alert>
      )}
    </Fragment>
  );
};

export default EventLocationInput;
