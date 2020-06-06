import React from 'react';

import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

const SnackProvider: React.FC = ({ children }) => (
  <NotistackSnackbarProvider
    maxSnack={3}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    {children}
  </NotistackSnackbarProvider>
);

export default SnackProvider;
