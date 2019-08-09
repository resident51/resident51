import React from "react";

import moment from "moment";
import { Formik, Field } from "formik";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import EventNameInput from "./FormComponents/EventNameInput";
import EventTypeInput from "./FormComponents/EventTypeInput";
import EventDescriptionInput from "./FormComponents/EventDescriptionInput";
import EventDateInput from "./FormComponents/EventDateInput";
import EventTimeInput from "./FormComponents/EventTimeInput";
import EventLocationInput from "./FormComponents/EventLocationInput";
import EventPublicInput from "./FormComponents/EventPublicInput";
import EventFacilitationInput from "./FormComponents/EventFacilitationInput";

import validationSchema from "./validationSchema";

const CreateEventForm = () => {
  // By default, set the date to today and the time to 7pm
  const defaultDateTime = moment()
    .hour(18)
    .minute(0)
    .second(0)
    .millisecond(0);

  const formInitialValues = {
    name: "",
    type: "social",
    description: "",
    location: "",
    date: defaultDateTime,
    time: defaultDateTime.format("kk:mm"),
    publicStatus: {
      type: "any", // "any" | "complex" | "halls" | "hall"
      halls: [] // only needed with halls | hall
    },
    facilitation: {
      organizationType: "",
      organizationName: ""
    },
    recurring: false
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={formInitialValues}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3>1. Name the event</h3>
          <Field name="name" component={EventNameInput} />
          {errors.name && touched.name && (
            <Alert variant={"danger"}>{errors.name}</Alert>
          )}

          <hr />
          <h3>2. Describe the event</h3>
          <Field name="type" component={EventTypeInput} />
          {errors.type && touched.type && (
            <Alert variant={"danger"}>{errors.type}</Alert>
          )}

          <Field name="type" component={EventDescriptionInput} />
          {errors.description && touched.description && (
            <Alert variant={"danger"}>{errors.description}</Alert>
          )}

          <hr />
          <h3>3. Choose a time</h3>
          <Row>
            <Col xs={12} xl={6}>
              <Field name="date" component={EventDateInput} />
              {errors.date && touched.date && (
            <Alert variant={"danger"}>{errors.date}</Alert>
          )}
            </Col>
            <Col xs={12} sm={10} md={8} xl={6}>
              <Field name="time" component={EventTimeInput} />
              {errors.time && touched.time && (
            <Alert variant={"danger"}>{errors.time}</Alert>
          )}
            </Col>
          </Row>

          <hr />
          <h3>4. Choose a location</h3>
          <Field name="location" component={EventLocationInput} />
          {errors.location && touched.location && (
            <Alert variant={"danger"}>{errors.location}</Alert>
          )}

          <hr />
          <h3>5. Choose attendees</h3>
          <Field name="publicStatus" component={EventPublicInput} />
          {/* {errors.publicStatus.type && touched.publicStatus.type && (
            <Alert variant={"danger"}>{errors.publicStatus.type}</Alert>
          )}
          {errors.publicStatus.halls && touched.publicStatus.halls && (
            <Alert variant={"danger"}>{errors.publicStatus.halls}</Alert>
          )} */}

          <hr />
          <h3>6. Extra Info</h3>
          <Field name="faciliation" component={EventFacilitationInput} />
          {/* {errors.facilitation.organizationType && touched.facilitation.organizationType && (
            <Alert variant={"danger"}>{errors.facilitation.organizationType}</Alert>
          )}
          {errors.facilitation.organizationName && touched.facilitation.organizationName && (
            <Alert variant={"danger"}>{errors.facilitation.organizationName}</Alert>
          )} */}

          <br />
          <Button block variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEventForm;
