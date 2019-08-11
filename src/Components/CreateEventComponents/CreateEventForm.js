import React, {useContext} from "react";

import { HallsContext } from "../../Contexts/HallsContext";
import { EventTypesContext } from "../../Contexts/EventTypesContext";

import moment from "moment";
import { Formik, Field } from "formik";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  const { eventTypes } = useContext(EventTypesContext);
  const { halls } = useContext(HallsContext);

  // By default, set the date to today and the time to 7pm
  const defaultDateTime = moment()
    .hour(18).minute(0).second(0).millisecond(0);

  const formInitialValues = {
    name: "",
    type: "social",
    description: "",
    location: "",
    date: defaultDateTime,
    time: defaultDateTime.format("kk:mm"), // 6:00 PM / 18:00
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

  const formValidationSchema = validationSchema({halls, eventTypes})

  return (
    <Formik
      validationSchema={formValidationSchema}
      initialValues={formInitialValues}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3>1. Name the event</h3>
          <Field name="name" component={EventNameInput} />
          
          <hr />
          <h3>2. Describe the event</h3>
          <Field name="type" component={EventTypeInput} />
          <Field name="type" component={EventDescriptionInput} />
          
          <hr />
          <h3>3. Choose a time</h3>
          <Row>
            <Col xs={12} xl={6}>
              <Field name="date" component={EventDateInput} />
            </Col>
            <Col xs={12} sm={10} md={8} xl={6}>
              <Field name="time" component={EventTimeInput} />
            </Col>
          </Row>

          <hr />
          <h3>4. Choose a location</h3>
          <Field name="location" component={EventLocationInput} />

          <hr />
          <h3>5. Choose attendees</h3>
          <Field name="publicStatus" component={EventPublicInput} />

          <hr />
          <h3>6. Extra Info</h3>
          <Field name="faciliation" component={EventFacilitationInput} />

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
