import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Components/Routes';

import { EventsProvider } from './Contexts/Events';
import { UserProvider } from './Contexts/User';

const App: React.FC = () => (
  <Router>
    R<span className="d-sm-inline d-none">esident </span>51
    <UserProvider>
      <EventsProvider>
        <Routes />
      </EventsProvider>
    </UserProvider>
  </Router>
);

export default App;
