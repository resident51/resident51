import React from 'react';

import { useUser } from '../Contexts/User';
import { useEvents } from '../Contexts/Events';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <div>
      hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'} events.
    </div>
  );
};

export default Home;
