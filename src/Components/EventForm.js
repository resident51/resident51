import React, { useContext } from "react";

import { HallsContext } from "../Contexts/HallsContext";
import { EventTypesContext } from "../Contexts/EventTypesContext";

import moment from "moment";
import { Formik, Field } from "formik";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import EventNameInput from "./EventFormComponents/EventNameInput";
import EventTypeInput from "./EventFormComponents/EventTypeInput";
import EventDescriptionInput from "./EventFormComponents/EventDescriptionInput";
import EventDateInput from "./EventFormComponents/EventDateInput";
import EventTimeInput from "./EventFormComponents/EventTimeInput";
import EventLocationInput from "./EventFormComponents/EventLocationInput";
import EventPublicInput from "./EventFormComponents/EventPublicInput";
import EventFacilitationInput from "./EventFormComponents/EventFacilitationInput";

import validationSchema from "./validationSchema";

const EventForm = ({ event = {}, onSubmit }) => {

  const { eventTypes } = useContext(EventTypesContext);
  const { halls } = useContext(HallsContext);

  const formInitialValues = {
    name: event.name || "",
    type: event.type || "",
    description: event.description || "",
    location: event.location || "",
    date: moment(event.dateTime) || null,
    time: event.dateTime ? moment(event.dateTime).format("kk:mm") : "18:00", // 6:00 PM
    publicStatus: event.publicStatus || {
      type: "",
      halls: ""
    },
    facilitation: event.facilitation || {
      organizationType: "",
      organizationName: ""
    },
    recurring: event.recurring || false
  };

  const formValidationSchema = validationSchema({ halls, eventTypes })

  return (
    <Formik
      validationSchema={formValidationSchema}
      initialValues={formInitialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3>1. Name the event</h3>
          <Field name="name" component={EventNameInput} />

          <hr />
          <h3>2. Describe the event</h3>
          <Field name="type" component={EventTypeInput} />
          <Field name="description" component={EventDescriptionInput} />

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

export default EventForm;
