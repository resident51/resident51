import React from 'react';
import Card from 'react-bootstrap/Card';

const FeedbackFAQ: React.FC = () => (
  <Card>
    <Card.Body>
      <Card.Text>
        <strong>What is this section for?</strong> This area is where you can submit information,
        ideas, concerns and questions about your Schol Hall and the complex in general.
      </Card.Text>
      <Card.Text>
        <strong>Who views each submission?</strong> Feedback is made available to different
        community leaders depending on your hall and the feedback category. Note, however, that all
        students lead busy lives and there is no guarantee they will check it.
      </Card.Text>
      <Card.Text>
        <strong>How can I make useful submissions?</strong> Be constructive! What systemic problem
        led you to this page? What information can you share to realistically improve the community?
      </Card.Text>
      <Card.Text>
        <strong>I sent something but nothing has changed!</strong> The most effective way to
        communicate is speaking directly with members and leaders of your community. If you want to
        make something happen, you don't have to be the hall president! Talk to a friend, schedule
        something with your social chair, be proactive!
      </Card.Text>
      <Card.Text>
        <strong>I can't submit feedback! What's wrong?</strong> Some feedback options require you to
        be logged in and verified with a hall. This measure is to discourage unhelpful or toxic
        feedback. This isn't an internet forum, it's your community. As long as you remain
        constructive, your feedback will remain as anonymous as you wish it to be.
      </Card.Text>
    </Card.Body>
  </Card>
);

export default FeedbackFAQ;
