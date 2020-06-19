import React from 'react';

import UserProvider from './User';
import EventsProvider from './Events';
import SnackbarProvider from './Snackbar';
import ThemeProvider from './Theme';
import ModalProvider from './Modal';

/**
 * Contexts are wrapped in the order they are added to the following context array.
 * Context providers at the start of the array will wrap context providers "below them".
 * For example, UserProvider will wrap around EventsProvider, and so forth.
 */
const contextProviders: React.FC[] = [
  UserProvider,
  EventsProvider,
  SnackbarProvider,
  ThemeProvider,
  ModalProvider,
];

/**
 * Wrap the application in each React Context provider.
 */
const Resident51Contexts: React.FC<{ children: React.ReactElement }> = ({ children }) =>
  contextProviders.reduceRight(
    (AppCtxWrapper, CtxProvider) => <CtxProvider>{AppCtxWrapper}</CtxProvider>,
    children,
  );

export default Resident51Contexts;
