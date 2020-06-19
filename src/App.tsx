import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from '@app/components/navigation/Navigation';
import Routes from '@app/components/Routes';
import Resident51Contexts from '@app/contexts';

const useStyles = makeStyles({
  '@global': {
    'html, body, #root': {
      height: '100%',
      width: '100%',
    },
  },
});

const App: React.FC = () => {
  useStyles();

  return (
    <BrowserRouter>
      <CssBaseline />
      <Resident51Contexts>
        <Navigation>
          <Routes />
        </Navigation>
      </Resident51Contexts>
    </BrowserRouter>
  );
};

export default App;
