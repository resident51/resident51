import React from 'react';

import { Router } from 'react-router-dom';

import { useEvents } from '../Contexts/Events';
import { useUser } from '../Contexts/User';

import Header from './navigation/Header';
import history from './navigation/history';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();
  return (
    <>
      <Header />
      <Router history={history}>
        <div>
          hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'} events.
        </div>
      </Router>
    </>
  );
};

export default Home;
