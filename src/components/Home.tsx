import React from 'react';

import { SignedInUser } from '@app/types';

import { useEvents } from '@app/contexts/services/Events';
import { useUser } from '@app/contexts/services/User';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <div>
      hey {(user as SignedInUser)?.displayName || 'pal'}, there's{' '}
      {events ? events.length : '(loading)'} events.
    </div>
  );
};

export default Home;
