import React, { useContext, useState } from 'react';

import { EventTypesContext } from "../../Contexts/EventTypesContext";
import { HallsContext } from "../../Contexts/HallsContext";

import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import { Formik } from 'formik';
// import { Formik, Field } from 'formik';
import * as yup from 'yup';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Accordion, { useAccordionToggle } from 'react-bootstrap/Accordion';
// import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

// import R51Card from "./R51Card";


const validationSchema = yup.object({
  name: yup.string().min(2).max(50).required(), // =|=|= DONE =|=|=
  dateTime: yup.date(),
  description: yup.string().min(20).max(500).required(), // =|=|= DONE =|=|=
  type: yup.string()
    .oneOf(["social", "meeting", "meal", "community", "alumni", "campus"])
    .required(), // =|=|= DONE =|=|=
  recurring: yup.bool(false),
  location: yup.object({
    type: yup.string().oneOf(["scholhalls", "campus", "other"]),
    place: yup.string().min(6).required()
  }),
  publicStatus: {
    type: yup.string().oneOf(["any", "complex", "halls", "hall"]),
    halls: yup.array() // only needed with halls | hall
  },
  facilitation: yup.object({
    organizationType: yup.string()
      .oneOf(["hall", "ASHC", "staff", "committee", "campus", "other"])
      .required(),
    organizationName: yup.string().min(6).required(),
    submittedBy: yup.string().required(),
    approvedBy: yup.string().required()
  })
});

const CreateEventForm = () => {

  const { eventTypes } = useContext(EventTypesContext);
  const { halls } = useContext(HallsContext);

  const [calendarFocused, setCalendarFocused] = useState(false);

  // By default, set the date to the Friday two weeks from now.
  const defaultDateTime = moment().add(14, 'days').date(5)

  // By default, set the time to be 7pm.
  defaultDateTime.hour(19).minute(0).second(0).millisecond(0)


  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        type: "social",
        locationType: "scholhalls",
        dateTime: defaultDateTime,
        publicStatus: {
          type: "complex", // "any" | "complex" | "halls" | "hall"
          halls: [] // only needed with halls | hall
        },
        recurring: false
      }}
      onSubmit={({ values }) => {
        // e.preventDefault();
        alert(JSON.stringify(values, null, 2));
      }}
      render={({ values, handleSubmit, handleChange, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="eventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              name="name"
              maxLength={50}
              onChange={handleChange}
              value={values.name}
              type="text"
              placeholder="Enter event name"
            />
            <Form.Text className="text-muted">
              Limit 50 Characters ({50 - (values.name || 0)} remaining)
            </Form.Text>
          </Form.Group>

          <fieldset>
            <Form.Group>
              <Form.Label as="legend">
                What type of event is this?
              </Form.Label>
              <Row>
                {Object.keys(eventTypes)
                  .map(type => ({ type, formal: eventTypes[type].formal }))
                  .map(({ type, formal }) => (
                    <Col key={type} sm={6} md={4}>
                      <Form.Check
                        custom
                        type="radio"
                        label={formal}
                        name="type"
                        id={`event-type-${type}`}
                        onChange={handleChange}
                        value={type}
                      />
                    </Col>
                  ))}
              </Row>
            </Form.Group>
          </fieldset>

          <fieldset>
            <Form.Group>
              <Form.Label as="legend">
                Where will the event be held?
            </Form.Label>
              <Row>
                <Col sm={4}>
                  <Form.Check
                    custom
                    type="radio"
                    label="In-complex"
                    value="scholhalls"
                    id="location-scholhalls"
                    name="location.type"
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <Form.Check
                    custom
                    type="radio"
                    value="campus"
                    label="On campus"
                    id="location-campus"
                    name="location.type"
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <Form.Check
                    custom
                    type="radio"
                    value="other"
                    label="Elsewhere"
                    id="location-other"
                    name="location.type"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </fieldset>

          <Form.Group>
            <Form.Label>
              When will you schedule your event?
            </Form.Label>
            <Container>
              <SingleDatePicker
                name="dateTime"
                date={values.dateTime}
                onDateChange={handleChange}
                focused={calendarFocused}
                onFocusChange={({ focused }) => setCalendarFocused(focused)}
                numberOfMonths={2}
                isOutsideRange={() => false}
              />
            </Container>
          </Form.Group>

          <Form.Group controlId="eventDescription">
            <Form.Label>Event description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={
                "Describe your event! A few sentences should do the trick."
              } />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    />
  )
}

export default CreateEventForm;