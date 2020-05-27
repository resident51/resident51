import React from 'react';

import { EventsProvider } from './Events';
import { ThemeProvider } from './Theme';
import { UserProvider } from './User';

const Resident51Contexts: React.FC = ({ children }) => (
  <UserProvider>
    <EventsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </EventsProvider>
  </UserProvider>
);

export default Resident51Contexts;
