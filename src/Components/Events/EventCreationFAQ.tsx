import React from "react";

import Card from "react-bootstrap/Card";

const EventCreationFAQ: React.FC = () => (
  <Card>
    <Card.Body>
      <Card.Text>
        <strong>What happens when I submit an event?</strong> Once you've filled out the event
        creation form, the submission is shared with a resident on an executive board pertinent to
        the event, such as a hall president, social chair, etc., who can approve the event.
      </Card.Text>
      <Card.Text>
        <strong>How can I make sure the event is approved?</strong> Be sure to discuss your event
        with with an exec member, BEFORE submitting your proposal. Additionally, make sure all
        necessary fields are filled out so that other residents are properly informed when viewing
        it on the website.
      </Card.Text>
      <Card.Text>
        <strong>Who should be informed of the event before I submit it?</strong> It depends on the
        event. If you the event involves multiple halls, talk to members of those halls. If the
        event requires funding, talk to your treasurer. If the event involves food, like a co-hall
        meal, talk to your FBM. In general, always inform your president and social chair first.
      </Card.Text>
    </Card.Body>
  </Card>
);

export default EventCreationFAQ;
