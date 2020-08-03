import React from 'react';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238',
      light: '#4f5b62',
      dark: '#000a12',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03a9f4',
      light: '#67daff',
      dark: '#007ac1',
      contrastText: '#000000',
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #root': {
          height: '100%',
          width: '100%',
        },
        '.MuiAlert-root': {
          padding: '6px',
        },
        '.MuiAlert-icon': {
          padding: '2px 0 0',
        },
        '.MuiAlert-message': {
          padding: '2px 0 0',
        },
        '.MuiAlert-action': {
          marginRight: '-4px',
        },
      },
    },
  },
});

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
