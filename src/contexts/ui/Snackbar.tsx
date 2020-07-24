import React, { useCallback, useRef } from 'react';

import { Close } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import {
  SnackbarProvider as NotistackSnackbarProvider,
  ProviderContext,
  useSnackbar,
} from 'notistack';
import { useTheme } from '@material-ui/core/styles';

const SnackProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const notistackRef = useRef<ProviderContext>(null);

  const closingAction = useCallback(
    (key: string) => {
      return (
        <IconButton
          style={{ color: theme.palette.primary.contrastText }}
          onClick={(): void => notistackRef.current?.closeSnackbar(key)}
        >
          <Close />
        </IconButton>
      );
    },
    [theme.palette.primary.contrastText],
  );

  return (
    <NotistackSnackbarProvider
      ref={notistackRef}
      maxSnack={3}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      action={closingAction}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};

export { useSnackbar };
export default SnackProvider;
