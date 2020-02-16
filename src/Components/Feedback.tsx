import React from 'react';

import useDocumentTitle from '../Hooks/useDocumentTitle';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FeedbackFAQ from './Feedback/FeedbackFAQ';
import WebsiteForm from './Feedback/Website';

import { feedbackCollection } from '../Firebase/firebase';

const Feedback: React.FC = () => {
  useDocumentTitle('Resident 51 | Feedback');

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <FeedbackFAQ />
        </Col>
        <Col sm={12} md={7}>
          <h1 className="text-center">Website Feedback</h1>
          <Row className="justify-content-md-center">
            <Col sm={12} md={10}>
              <div className="mt-2">
                <WebsiteForm feedbackCollection={feedbackCollection} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;
