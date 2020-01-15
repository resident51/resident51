import React, { useContext } from "react";

import { EventForm as EventFormType } from "../Types/";

import { firestore } from "firebase/app";

import { EventsContext } from "../Contexts/Events";
import { UserContext } from "../Contexts/User";

import { useHistory } from "react-router-dom";

import { FormikHelpers } from "formik";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { eventsCollection } from "../Firebase/firebase";

import EventForm from "./Events/EventForm";
import EventCreationFAQ from "./Events/EventCreationFAQ";

const CreateEvent: React.FC = () => {
  const history = useHistory();

  const { formatSubmittedEvent } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  // After event is validated, dispatch the event to firebase and redirect to the events page.
  const onSubmit = (event: EventFormType, actions: FormikHelpers<EventFormType>): void => {
    if (!user || !user.displayName || user.permissions < 2) return;

    const formattedEvent = formatSubmittedEvent(event, {
      userId: user.uid,
      displayName: user.displayName,
      dateTime: firestore.FieldValue.serverTimestamp()
    });
    // (jfc this works but it's horrendous practice)
    // #TODO use a useFirebase hook, then wait for success from firebase before redirect
    eventsCollection
      .add(formattedEvent)
      .then(() => history.push("/events", { update: "Event created!", t: Date.now() }))
      .catch(e => {
        actions.setSubmitting(false);
        console.error(e);
      });
  };

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          <h1>Create New Event</h1>
          <hr />
          <EventForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
