import React from "react";

import Card from "react-bootstrap/Card";

type cardProps = { children?: any }
const R51Card = (props: cardProps) => (
  <Card className="mb-3">
    {props.children}
  </Card>
)

type homeProps = { title: string, children: any }
R51Card.Home = (props: homeProps) => (
  <Card className="mb-3">
    <Card.Header className="text-center">
      <h2>{props.title}</h2>
    </Card.Header>
    <Card.Body>{props.children}</Card.Body>
  </Card>
);

R51Card.Header = Card.Header;

R51Card.Body = Card.Body;

export default R51Card