import React, { useContext } from "react";

import { EventsContext } from "../Contexts/EventsContext";
import { UserContext } from "../Contexts/UserContext";

import moment from "moment";
import { Formik, Field, FastField } from "formik";

import Alert from "react-bootstrap/Alert";
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

import validationSchema from "./EventFormComponents/eventValidationSchema";

const EventForm = ({ event = {}, onSubmit, eventUpdated = false }) => {

  const { eventTypes, halls } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  const formInitialValues = {
    name: event.name || "",
    type: event.type || "",
    description: event.description || "",
    location: event.location || "",
    date: moment(event.dateTime) || null,
    time: event.dateTime ? moment(event.dateTime).format("kk:mm") : "18:00", // 6:00 PM
    publicStatus: event.publicStatus || {
      type: "public",
      // TODO: enforce user exists
      halls: user ? [user.hall] : []
    },
    facilitation: event.facilitation || {
      organizationType: "",
      organizationName: ""
    },
    recurring: event.recurring || false
  };

  const formValidationSchema = validationSchema({ halls, eventTypes, hall: user.hall });

  const updatedWarning = (
    <Alert variant="warning"> Someone else just updated this event. If you submit now, those
      changes would be overwritten. Please save your changes and refresh the page.</Alert>
  );

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validationSchema={formValidationSchema}
    >
      {({ handleSubmit, isSubmitting }) => {

        return (
          <Form noValidate onSubmit={handleSubmit}>

            {eventUpdated && updatedWarning}

            <h3>1. Name the event</h3>
            <FastField name="name" component={EventNameInput} />

            <hr />
            <h3>2. Describe the event</h3>
            <FastField name="type" component={EventTypeInput} />
            <FastField name="description" component={EventDescriptionInput} />

            <hr />
            <h3>3. Choose a time</h3>
            <Row>
              <Col xs={12} xl={6}>
                <FastField name="date" component={EventDateInput} />
              </Col>
              <Col xs={12} sm={10} md={8} xl={6}>
                <FastField name="time" component={EventTimeInput} />
              </Col>
            </Row>

            <hr />
            <h3>4. Choose a location</h3>
            <FastField name="location" component={EventLocationInput} />

            <hr />
            <h3>5. Choose attendees</h3>
            <FastField name="publicStatus" component={EventPublicInput} />

            <hr />
            <h3>6. Extra Info</h3>
            <Field name="faciliation" component={EventFacilitationInput} />

            {eventUpdated && updatedWarning}

            <Row className="mt-5">
              <Col xl={3} lg={3} md={4} sm={4} className="mb-3 pr-sm-0">
                <Button block variant="secondary" size="lg" type="button" disabled={isSubmitting}>
                  Save draft
                </Button>
              </Col>
              <Col className="mb-3">
                <Button block variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )
      }}
    </Formik>
  );
};

export default EventForm;
