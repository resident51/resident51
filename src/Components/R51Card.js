import React from "react";

import Card from "react-bootstrap/Card";

const R51Card = props => (
  <Card className="R51Card">
    {props.children}
  </Card>
)

R51Card.Home = props => (
    <Card className="R51Card">
      <Card.Header className="text-center">
        <h2>{props.title}</h2>
      </Card.Header>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );

R51Card.Header = Card.Header;

R51Card.Body = Card.Body;

export default R51Card