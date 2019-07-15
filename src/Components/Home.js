import React from "react";

import Container from "react-bootstrap/Container";
// import CardColumns from "react-bootstrap/CardColumns";
// import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCard from "./HomeCard";

import "./Home.css";

// Dev
import lorem from "../tests/lorem";
const gen = lorem.generateSentences.bind(lorem);

const Home = () => (
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