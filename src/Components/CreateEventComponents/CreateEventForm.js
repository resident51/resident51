import React, { useContext } from 'react';

import { Link } from "react-router-dom";

import { HallsContext } from "../../Contexts/HallsContext";

import moment from 'moment';

import { Formik, Field } from 'formik';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import EventNameInput from './FormComponents/EventNameInput';
import EventTypeInput from './FormComponents/EventTypeInput';
import EventDescriptionInput from './FormComponents/EventDescriptionInput';
import EventDateInput from './FormComponents/EventDateInput';
import EventTimeInput from './FormComponents/EventTimeInput';
import EventRecurringInput from './FormComponents/EventRecurringInput';

import R51Card from "../R51Card";

import validationSchema from './validationSchema';

const CreateEventForm = () => {

  const { halls } = useContext(HallsContext);

  const hallsAndCrawford = [...halls, "Crawford Building"];

  // By default, set the date to today and the time to 7pm
  const defaultDateTime = moment()
    .hour(19).minute(0).second(0).millisecond(0);

  const formInitialValues = {
    name: "",
    type: "social",
    location: {
      type: "scholhalls",
      place: ""
    },
    dateTime: defaultDateTime,
    faketime: "",
    publicStatus: {
      type: "complex", // "any" | "complex" | "halls" | "hall"
      halls: [] // only needed with halls | hall
    },
    recurring: false,
    description: ""
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={formInitialValues}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      render={({ values, handleSubmit, handleChange, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>

          <h3>1. Name your event</h3>

          <Form.Group controlId="eventName">
            <Form.Label>Event Name</Form.Label>
            <Field name="name" component={EventNameInput} />
            <Form.Text className="text-muted">
              Limit 50 Characters ({
                50 - (values.name ? values.name.length : 0)
              } remaining)
            </Form.Text>
          </Form.Group>

          <h3>2. Describe your event</h3>

          <Form.Group>
            <Form.Label as="legend">What type of event is this?</Form.Label>
            <Field name="type" component={EventTypeInput} />
          </Form.Group>

          <Form.Group controlId="eventDescription">
            <Form.Label>Event description</Form.Label>
            <Field name="type" component={EventDescriptionInput} />
          </Form.Group>

          <h3>3. Schedule your event</h3>

          <Row>
            <Col lg={12} xl={6}>
              <Form.Group>
                <Form.Label>What day will you schedule your event?</Form.Label>
                <Field
                  name="dateTime"
                  component={EventDateInput}
                />
              </Form.Group>
            </Col>

            <Col lg={12} xl={6}>
              <hr />
              <Form.Group>
                <Form.Label>What time will your event take place?</Form.Label>
                <Field name="faketime" component={EventTimeInput} />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label>Is this a recurring event?</Form.Label>
                <Field name="recurring" component={EventRecurringInput} />
              </Form.Group>
              <hr />
            </Col>
          </Row>

          <h3>4. Choose a location</h3>
          <Form.Group>
            <Form.Label as="legend">
              Where on campus will your event be?
              </Form.Label>
            <Row>
              <Col sm={4}>
                <Form.Check
                  id="location-complex"
                  label="In complex"
                  custom
                  type="radio"
                  name="location.type"
                  value="scholhalls"
                  onChange={handleChange}
                  checked={values.location.type === "scholhalls"}
                />
              </Col>
              <Col sm={4}>
                <Form.Check
                  id="location-campus"
                  custom
                  type="radio"
                  name="location.type"
                  label="On campus"
                  value="campus"
                  onChange={handleChange}
                  checked={values.location.type === "campus"}
                />
              </Col>
              <Col sm={4}>
                <Form.Check
                  id="location-elsewhere"
                  custom
                  type="radio"
                  name="location.type"
                  label="Elsewhere"
                  value="other"
                  onChange={handleChange}
                  checked={values.location.type === "other"}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Form.Label as="legend">
              What is the location?
              </Form.Label>
            {values.location.type === "scholhalls" && <Row className="better-be-flex">
              {hallsAndCrawford.map(hall => (
                <Col key={hall} sm={6} md={4}>
                  <Form.Check
                    custom
                    type="radio"
                    label={hall}
                    name="location.place"
                    id={`location-hall-${hall}`}
                    onChange={handleChange}
                    value={hall}
                    checked={values.location.place === hall}
                  />
                </Col>
              ))}
              <Col key="place-other" sm={6} md={8}>
                <Form.Control
                  className="inline-pls"
                  label="Other in-complex"
                  name="location.place"
                  id="location-hall-other"
                  maxLength={50}
                  onChange={handleChange}
                  value={
                    hallsAndCrawford.some(loc =>
                      loc === values.location.place) ?
                      "" : values.location.place
                  }
                  type="text"
                  placeholder="(Other)"
                />
              </Col>
            </Row>}
          </Form.Group>

          <h3>5. Choose attendees</h3>

          <br />
          <Row>
            <Col sm={12} md={6}>
              <Button block variant="primary" type="submit">
                Submit
            </Button>
            </Col>
            <Col sm={12} md={6}>
              <R51Card>
                <R51Card.Header>
                  Form feedback.
                </R51Card.Header>
                <R51Card.Body>
                  We're looking for feedback on this form! Tell us what's missing or could be improved:
                  <Link target="none" to="/feedback">
                    <Button variant="success" block>Provide Website Feedback</Button>
                  </Link>
                </R51Card.Body>
              </R51Card>
            </Col>
          </Row>
        </Form>
      )}
    />
  )
}

export default CreateEventForm;