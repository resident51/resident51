import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import "./HomeCard.css";

export default class HomeCard extends Component {
  static defaultProps = {
    bg: "light",
    text: "primary"
  };

  render() {
    return (
      <Card className="HomeCard" bg={this.props.bg}>
        <Card.Header className="text-center">
          <h2>{this.props.title}</h2>
        </Card.Header>
        <Card.Body>{this.props.children}</Card.Body>
      </Card>
    );
  }
}
