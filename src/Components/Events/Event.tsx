import React from "react";

import { EventR51, EventTypeFormat, Hall, EventFormPublicType } from "../../Types/";

import moment from "moment";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

type EventProps = {
  event: EventR51;
  canUpdate: (publicStatus: { type: EventFormPublicType; halls: Hall[] }) => boolean;
  format: EventTypeFormat;
};
const Event: React.FC<EventProps> = props => {
  const event =
    props.event && props.event.name ? props.event : ({ name: "Event data error" } as EventR51);

  const format =
    props.format && props.format.color
      ? props.format
      : ({ color: "black", formal: "Event formatting error" } as EventTypeFormat);

  const { id, name, location, description, dateTime } = event;
  const dateTimeMoment = moment(dateTime);

  const { canUpdate } = props;

  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={id}
        style={{ borderLeft: `10px solid ${format.color}` }}
      >
        <Row className="justify-content-between">
          <Col className="text-truncate">
            <strong>{name}</strong>
          </Col>
          <Col className="d-block" md="auto" xs={12}>
            <Row className="justify-content-between">
              <Col xs="auto" className="pr-0">
                <i>{dateTimeMoment.format("MMMM Do, YYYY")}</i>
              </Col>
            </Row>
          </Col>
        </Row>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>
          <Row className="justify-content-between mb-sm-1 mb-0">
            <Col className="text-truncate">
              <h5>
                <span className="d-sm-inline d-none">Location: </span>
                {location}
              </h5>
            </Col>
            {canUpdate(event.publicStatus) && (
              <Col xs="auto" className="event-admin-config">
                <Link
                  to={{ pathname: `/events/edit/${id}`, state: { event } }}
                  style={{ color: "slategray" }}
                >
                  Edit
                </Link>
                <span> &middot; </span>
                <Link
                  to={{ pathname: `/events/delete/${id}`, state: { event } }}
                  style={{ color: "red" }}
                >
                  Delete
                </Link>
              </Col>
            )}
          </Row>
          <Row className="justify-content-between">
            <Col>
              <h6 className="mb-0">
                <span className="d-sm-inline d-none">Time: </span>
                {dateTimeMoment.format("h:mm A")}
              </h6>
            </Col>
            <Col xs="auto">
              <h6 className="mb-0">
                <span className="d-sm-inline d-none">Event Type: </span>
                {format.formal}
              </h6>
            </Col>
          </Row>
          <hr />
          <p className="mb-1">{description}</p>
          <Row className="justify-content-between mb-0 pb-0">
            <Col xs="auto">
              <small className="text-muted">
                {event.publicStatus.type === "public" ? "Public" : "Private"} event
              </small>
            </Col>
            <Col xs="auto">
              <small className="text-muted">Modified {moment(event.lastEdit).fromNow()}</small>
            </Col>
          </Row>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Event;
