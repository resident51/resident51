import React from 'react';

import useDocumentTitle from '../hooks/useDocumentTitle';
import { useEvents } from '../contexts/Events';
import { useUser } from '../contexts/User';

import Header from './navigation/Header';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  useDocumentTitle('Home');

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
