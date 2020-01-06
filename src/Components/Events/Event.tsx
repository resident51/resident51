import React from 'react';

import { EventR51, EventFormat } from '../../Types/';

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faLock } from '@fortawesome/free-solid-svg-icons'

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { Link } from "react-router-dom";

type props = {
  showModify: boolean
  event: EventR51,
  format: EventFormat,
}
const Event = (props: props) => {
  const event = (props.event && props.event.name)
    ? props.event
    : { name: 'Event data error' } as EventR51;

  const format = (props.format && props.format.color)
    ? props.format
    : { color: 'black', formal: 'Event formatting error' } as EventFormat;

  const { id, name, location, description, dateTime } = event;
  const dateTimeMoment = moment(dateTime);

  const { showModify } = props;

  const icon = event.publicStatus.type === 'public' ? faGlobeAmericas : faLock;
  const publicIcon = <FontAwesomeIcon size="sm" icon={icon} />;

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
              <Col xs="auto">
                {publicIcon}
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
            {showModify &&
              <Col xs="auto" className="event-admin-config">
                <Link
                  to={{ pathname: `/events/edit/${id}`, state: { event } }}
                  style={{ color: "slategray" }}
                >
                  Edit
                </Link>
                <span>  &middot;  </span>
                <Link
                  to={{ pathname: `/events/delete/${id}`, state: { event } }}
                  style={{ color: "red" }}
                >
                  Delete
                </Link>
              </Col>
            }
          </Row>
          <Row className="justify-content-between">
            <Col>
              <h6 className="mb-0">
                <span className="d-sm-inline d-none">Time: </span>
                {dateTimeMoment.format("h:mm A")}</h6>
            </Col>
            <Col xs="auto">
              <h6 className="mb-0">
                <span className="d-sm-inline d-none">Event Type: </span>
                {format.formal}
              </h6>
            </Col>
          </Row>
          <hr />
          <p>{description}</p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
};

export default Event;