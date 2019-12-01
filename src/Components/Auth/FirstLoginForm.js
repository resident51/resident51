import React, { useContext } from "react";

import { EventsContext } from "../../Contexts/Events";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik, FastField } from "formik";

import ResidentName from './FirstLoginForm/ResidentName';
import ResidentHall from './FirstLoginForm/ResidentHall';
import ResidentEmail from './FirstLoginForm/ResidentEmail';

import generateResidentValidationSchema from "./FirstLoginForm/residentValidationSchema";

const FirstLoginForm = ({ name, onSubmit }) => {

  const { halls } = useContext(EventsContext);

  const formInitialValues = { name, hall: '', email: '' };

  const validationSchema = generateResidentValidationSchema(halls);

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3 className="pt-4 text-center">Did we get your name right?</h3>
          <FastField name="name" component={ResidentName} />

          <h3 className="pt-4 text-center">What hall are you living in?</h3>
          <FastField name="hall" component={ResidentHall} />

          <h3 className="pt-4 text-center">What KU email can we reach you at?</h3>
          <FastField name="email" component={ResidentEmail} />

          <Row className="justify-content-center pt-5">
            <Col xs={8}>
              <Button block variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                Request Verification
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FirstLoginForm;