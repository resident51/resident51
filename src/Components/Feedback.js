import React from "react";

import Container  from "react-bootstrap/Container";
import Row        from "react-bootstrap/Row";
import Col        from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Nav  from "react-bootstrap/Nav";
import Tab  from "react-bootstrap/Tab";

import FeedbackFAQ from './FeedbackComponents/FeedbackFAQ';

import WebsiteForm  from "./FeedbackComponents/WebsiteForm";
import StaffForm    from "./FeedbackComponents/StaffForm";
import EventForm    from "./FeedbackComponents/EventForm";
import OtherForm    from "./FeedbackComponents/OtherForm";

// // Dev
// import lorem from "../tests/lorem";
// const gen = lorem.generateSentences.bind(lorem);

const Feedback = () => (
  <Container className="HomeCard margin-bottom" fluid={true}>
    <Row className="justify-content-md-center">
      <Col sm={12} md={4}>
        <FeedbackFAQ />
      </Col>
      <Col sm={12} md={7}>
        <h2>Provide Feedback</h2>
        <Card>
          <Tab.Container defaultActiveKey="website">
            <Card.Header>
              <Nav justify variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="website">Website</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="events">Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="staff">Staff</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="other">Other</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="website">
                  <WebsiteForm />
                </Tab.Pane>
                <Tab.Pane eventKey="events">
                  <EventForm />
                </Tab.Pane>
                <Tab.Pane eventKey="staff">
                  <StaffForm />
                </Tab.Pane>
                <Tab.Pane eventKey="other">
                  <OtherForm />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Tab.Container>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Feedback;
