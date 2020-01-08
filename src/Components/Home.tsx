import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// Dev
import lorem from "../tests/lorem";
const gen = lorem.generateSentences.bind(lorem);

const HomeCard: React.FC<{ title: string }> = props => (
  <Card className="mb-3">
    <Card.Header className="text-center">
      <h2>{props.title}</h2>
    </Card.Header>
    <Card.Body>{props.children}</Card.Body>
  </Card>
);

const Home: React.FC = () => (
  <Container fluid={true}>
    <Row className="justify-content-md-center">
      <Col md={10} lg={6}>
        <HomeCard title="Events">{gen(11)}</HomeCard>
        <HomeCard title="Resources">{gen(7)}</HomeCard>
      </Col>
      <Col md={10} lg={6}>
        <HomeCard title="Legacy">{gen(12)}</HomeCard>
        <HomeCard title="Feedback">{gen(2)}</HomeCard>
      </Col>
    </Row>
  </Container>
);

export default Home;
