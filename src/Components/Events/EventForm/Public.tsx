import React, { useState, useContext } from "react";

import { Hall } from '../../../Types/';

import { EventsContext } from "../../../Contexts/Events";
import { UserContext } from "../../../Contexts/User";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { FieldProps } from 'formik';
import { EventFormValues } from '../EventForm';
import AlertInFormer from '../../Layout/AlertInFormer';

const EventPublicInput = (props: FieldProps<EventFormValues>) => {
  const { form: { values, errors, touched }, field } = props;
  const { user } = useContext(UserContext);
  const { halls } = useContext(EventsContext);

  const userHall = user && user.hall;
  const [selected, setSelected] = useState(values.publicStatus.halls);

  const types = [
    ["public", "Open to anyone"],
    ["halls", "Multiple halls"],
    ["hall", "My hall"]
  ];

  return (
    <AlertInFormer errors={errors} touched={touched} name={['publicStatus', 'type']}>
      <AlertInFormer errors={errors} touched={touched} name={['publicStatus', 'halls']}>
        <Form.Group>
          <Form.Label>Who will be attending this event?</Form.Label>
          <Row>
            {types.map(([code, formal]) => (
              <Col key={code} xs={6} xl={3}>
                <Form.Check
                  custom
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
            <Form.Label>Which halls?</Form.Label>
            <Row>
              {halls.map(hall => (
                <Col key={hall} sm={6} md={4}>
                  <Form.Check
                    custom
                    label={hall}
                    name="publicStatus.halls"
                    id={`public-select-hall-${hall}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // If this hall is already in selected, remove it, else add it.
                      const toChange: Hall[] = selected.includes(hall)
                        ? selected.filter(v => v !== hall)
                        : [...selected, e.target.value as Hall];

                      field.onChange(e);
                      setSelected(toChange);
                    }}
                    value={hall}
                    disabled={userHall === hall}
                    checked={userHall === hall || selected.includes(hall)}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
        )}
      </AlertInFormer>
    </AlertInFormer>
  );
};

export default EventPublicInput;
