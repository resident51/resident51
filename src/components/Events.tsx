import React from 'react';

import { SignedInUser } from '@app/types';

import { useEvents } from '@app/contexts/services/Events';
import { useUser } from '@app/contexts/services/User';

const Events: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <div>
      <p>Howdy, {(user as SignedInUser)?.displayName || 'pal'}, this is the events page.</p>
      <p>Also, there are {events ? events.length : '(loading)'} events.</p>
    </div>
  );
};

export default Events;
