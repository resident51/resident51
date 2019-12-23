import React, { useContext } from "react";

import { EventsContext } from "../../../Contexts/Events";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FieldProps } from "formik";

import { FirstLoginFormValues } from '../FirstLoginForm';

const ResidentHall = (props: FieldProps<FirstLoginFormValues>) => {
  const { form: { values, touched, errors }, field } = props;
  const { halls } = useContext(EventsContext);
  
  return (
    <>
      <Form.Group>
        {/*as="legend" was used here */}
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
      {errors.hall && touched.hall && (
        <Alert variant={"danger"}>{errors.hall}</Alert>
      )}
    </>
  )
};

export default ResidentHall;
