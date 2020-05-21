import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Components/Routes';

import { EventsProvider } from './Contexts/Events';
import { UserProvider } from './Contexts/User';

import Header from './Components/Layout/Header';
import NavDrawer from './Components/Layout/NavDrawer';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDrawerOpen = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ): void => {
    const isTabOrShift =
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift');
    if (!isTabOrShift) {
      setIsNavOpen(open);
    }
  };

  return (
    <Router>
      <UserProvider>
        <EventsProvider>
          <NavDrawer toggleDrawerOpen={toggleDrawerOpen} isNavOpen={isNavOpen} />
          <Header onDrawerOpen={toggleDrawerOpen(true)} />
          <div style={{ top: '64px' }}>
            <Routes />
          </div>
        </EventsProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
