import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "Resident 51 | 404";
  }, []);

  const history = useHistory();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="justify-contents-center">
          <h1 className="my-4 text-center">Bad News Bears:</h1>
          <p className="my-5 text-center lead">
            There is nothing here. Are you happy? Is this what you wanted? *Ruffles your hair* Gah,
            I can't stay mad at you :^)
          </p>
          <Button
            className="text-center"
            block
            onClick={(): void => {
              history.push("/");
            }}
            variant="primary"
            type="submit"
          >
            Back to Civilization
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
