import React from 'react';

import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

const SnackProvider: React.FC = ({ children }) => (
  <NotistackSnackbarProvider maxSnack={3}>{children}</NotistackSnackbarProvider>
);

export default SnackProvider;
