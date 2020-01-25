import React, { useContext } from "react";

import { VerificationRequest } from "../../../Types";

import { EventsContext } from "../../../Contexts/Events";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FieldProps } from "formik";

import AlertInFormer from "../../Layout/AlertInFormer";

const ResidentHall: React.FC<FieldProps<VerificationRequest>> = props => {
  const {
    form: { values, touched, errors },
    field
  } = props;
  const { halls } = useContext(EventsContext);

  return (
    <AlertInFormer errors={errors} touched={touched} name="hall">
      <Form.Group>
        <Form.Label>Choose your hall:</Form.Label>
        <Row>
          {halls.map(hall => (
            <Col key={hall} sm={6} md={4}>
              <Form.Check
                name="hall"
                required
                custom
                type="radio"
                label={hall}
                id={`resident-hall-${hall}`}
                onChange={field.onChange}
                value={hall}
                checked={values.hall === hall}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
    </AlertInFormer>
  );
};

export default ResidentHall;
