import React, { useCallback } from 'react';

import { Button } from '@material-ui/core';
import {
  SnackbarProvider as NotistackSnackbarProvider,
  OptionsObject,
  useSnackbar as useNotistackSnackbar,
} from 'notistack';

export const useSnackbar = (): ((message: string, options: OptionsObject) => void) => {
  const snackbar = useNotistackSnackbar();
  const enqueueSnack = useCallback(
    (message: string, options: OptionsObject) => {
      snackbar.enqueueSnackbar(message, {
        action: key => (
          <Button color="inherit" size="small" onClick={(): void => snackbar.closeSnackbar(key)}>
            Close
          </Button>
        ),
        ...options,
      });
    },
    [snackbar],
  );

  return enqueueSnack;
};

const SnackProvider: React.FC = ({ children }) => (
  <NotistackSnackbarProvider
    maxSnack={3}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    {children}
  </NotistackSnackbarProvider>
);

export default SnackProvider;
