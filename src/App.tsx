import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Home from '@app/components/Home';
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
        <Home />
      </Resident51Contexts>
    </BrowserRouter>
  );
};

export default App;
