import React from 'react';
import { UserProvider } from './User';
import { EventsProvider } from './Events';
import { ThemeProvider } from './Theme';

export const Resident51Contexts: React.FC = ({ children }) => (
  <UserProvider>
    <EventsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </EventsProvider>
  </UserProvider>
);

export default Resident51Contexts;
