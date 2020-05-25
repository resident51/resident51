import React from 'react';

import { useUser } from '../Contexts/User';
import { useEvents } from '../Contexts/Events';
import useDocumentTitle from '../Hooks/useDocumentTitle';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  useDocumentTitle('Home');

  return (
    <div>
      hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'} events.
    </div>
  );
};

export default Home;
