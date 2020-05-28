import React from 'react';

import { useEvents } from '../contexts/Events';
import { useUser } from '../contexts/User';

import Header from './navigation/Header';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();
  return (
    <React.Fragment>
      <Header />
      <div>
        hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'} events.
      </div>
    </React.Fragment>
  );
};

export default Home;
