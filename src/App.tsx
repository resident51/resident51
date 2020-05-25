import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Components/Routes';

import { EventsProvider } from './Contexts/Events';
import { UserProvider } from './Contexts/User';

import TopLevelNavigation from './Components/Layout/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <EventsProvider>
          <TopLevelNavigation>
            <Routes />
          </TopLevelNavigation>
        </EventsProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
