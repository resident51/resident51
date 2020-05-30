import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { useEvents } from '../contexts/Events';
import { useUser } from '../contexts/User';

import Header from './navigation/Header';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();

  return (
    <BrowserRouter>
      <Header />
      <div>
        hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'} events.
      </div>
    </BrowserRouter>
  );
};

export default Home;
