import React, { useEffect, useContext } from 'react';

import { UserContext } from '../Contexts/User';

import { useHistory } from 'react-router-dom';

import useDocumentTitle from '../Hooks/useDocumentTitle';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FAQ: React.FC = () => {
  useDocumentTitle('FAQ');

  const { user, isLoggingIn } = useContext(UserContext);

  const history = useHistory();
  useEffect(() => {
    if (!isLoggingIn && !user.uid) {
      history.replace('/');
    }
  }, [user, history, isLoggingIn]);

  if (!user.uid) return <div />;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h1>Frequently Asked Questions</h1>
          <p className="lead">
            Ok this isn't so much a bunch of questions as it is a comprehensive introduction to
            Resident 51. But we think that's better! Disagree? Who cares!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="justify-contents-center">
          <h3>Events</h3>
          <p>
            Events rule! It's also the main thing this website does. Anyway, here's some event
            facts:
          </p>
          <h5>Event Types</h5>
          <ul>
            <li>
              <strong>Social event</strong> - The most common type of event! Examples include Lupi
              Day, Neanderthal Ball, Casino Night, ASHC Olympic Events, on so forth.
            </li>
            <li>
              <strong>Meeting</strong> - Basically either a hall meeting, an exec board meeting, an
              ASHC Meeting, or a committee meeting like for the Community Service, Health and
              Wellness, Diversity and Inclusion or Environmental Committees.
            </li>
            <li>
              <strong>Community event</strong> - Pretty similar to a social event, but you probably
              won't pregame these. A few good examples might be Community Service or Diversity &amp;
              Inclusion events, Pawse for Pups, and all that good jazz!
            </li>
            <li>
              <strong>Co-hall meal</strong> - Pretty self-explanatory, but this can be any two
              halls, the entire complex, or any number of halls in between!
            </li>
            <li>
              <strong>Alumni Event</strong> - Also pretty self-explanatory. There is usually at
              least one complex-wide alumni event per year, but your hall may also host events that
              are specific to your own alumni!
            </li>
            <li>
              <strong>Campus event</strong> - These are dates or events that are significant to the
              University as a whole - examples include Stop Day, The Big Event, and so forth!
            </li>
          </ul>
          <p></p>
          <h5>Who may see an event</h5>
          <p>
            Resident 51 guarantees that if you are a verified resident of your hall, you will be
            able to see your hall's private events such as hall meetings or other hall-specific
            cultural events. Be aware that exec board members of any hall may view all private
            events so that scheduling conflicts may be avoided.
          </p>
        </Col>
        <Col xs={12} md={6} className="justify-contents-center">
          <h3>User Permissions</h3>
          <p>A user of Resident 51 may be one of four things:</p>
          <ul>
            <li>
              <strong>Unverified</strong> - A user who has not logged in can only see public events
              that should be available to any user anyway, like public social events or an ASHC Full
              Council meeting.
            </li>
            <li>
              <strong>Resident</strong> - The default permissions setting for users of Resident 51.
              When you have been verified by your hall's President, you will be able to see
              hall-specific events like Hall Meetings and other private events.
            </li>
            <li>
              <strong>Editor</strong> - Editors may approve and create Schol-Hall events. If you
              think a change should be made or have an idea for an event, contact an editor in your
              hall and request a change be made or a new event be created.
            </li>
            <li>
              <strong>Admin</strong> - Your hall President and Vice President are your hall's
              administrators. They may edit events and verify that you are a resident of your hall.
            </li>
          </ul>
          <hr />
          <h3>"Resident 51"</h3>
          <p>
            Yeah, like aliens - but also there are about 50 residents in the hall and then there's
            that "communication is the 6th man!" thing, remember? Yeah? No? whatever it's cool I
            swear.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;
