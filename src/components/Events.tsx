import React from 'react';

import { useEvents } from '@app/contexts/Events';
import { useUser } from '@app/contexts/User';

const Events: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <div>
      <p>Howdy, {user.displayName || 'pal'}, this is the events page.</p>
      <p>Also, there are {events ? events.length : '(loading)'} events.</p>
    </div>
  );
};

export default Events;
