import React from 'react';

import AlertDialogProvider from './ui/AlertDialogProvider';
import LoadingOverlayProvider from './ui/LoadingOverlayProvider';
import ModalProvider from './ui/ModalProvider';
import SnackbarProvider from './ui/SnackProvider';
import { EventsProvider } from './Events';
import { ThemeProvider } from './Theme';
import { UserProvider } from './User';

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
  LoadingOverlayProvider,
  AlertDialogProvider,
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
