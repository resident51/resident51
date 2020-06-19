import React from 'react';

import { useEvents } from '@app/contexts/Events';
import { useUser } from '@app/contexts/User';

const Events: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <div>
      Howdy, {user.displayName || 'pal'}, this is the events page. Also, there are {events ? events.length : '(loading)'} events.
    </div>
  );
};

export default Events;
