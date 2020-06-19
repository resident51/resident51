import React from 'react';

import { useEvents } from '@app/contexts/Events';
import { useUser } from '@app/contexts/User';

import Header from './navigation/Header';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <>
      <Header />
      <div>
        hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'} events.
      </div>
    </>
  );
};

export default Home;
