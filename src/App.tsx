import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './Components/Routes';

import Navigation from './Components/Layout/Navigation';
import { UserProvider } from './Contexts/User';
import { EventsProvider } from './Contexts/Events';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <UserProvider>
        <EventsProvider>
          <Navigation>
            <Routes />
          </Navigation>
        </EventsProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
