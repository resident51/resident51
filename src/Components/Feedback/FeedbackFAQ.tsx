import React from 'react';
import Card from 'react-bootstrap/Card';

const FeedbackFAQ: React.FC = () => (
  <Card>
    <Card.Body>
      <Card.Text>
        <strong>What is this section for?</strong> This page is where you can submit information,
        ideas, concerns and questions about this site! We would love any feedback you can provide
        and we will do what we can to make any improvements we can!
      </Card.Text>
      <Card.Text>
        <strong>How can I make useful submissions?</strong> Be constructive! What problem led you to
        this page? While it isn't necessary, specific solutions or suggestions are appreciated!
      </Card.Text>
      <Card.Text>
        <strong>I can't submit feedback! What's wrong?</strong> Feedback submissions require you to
        be logged in and verified with a hall. This measure is to discourage spam-y or unhelpful
        feedback.
      </Card.Text>
    </Card.Body>
  </Card>
);

export default FeedbackFAQ;
