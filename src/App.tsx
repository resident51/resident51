import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from './components/layout/Navigation';
import Resident51Contexts from './contexts';
import Routes from './components/Routes';

const useStyles = makeStyles({
  '@global': {
    'html, body': {
      height: '100%',
      width: '100%',
    },
  },
});

const App: React.FC = () => {
  useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Resident51Contexts>
          <Navigation>
            <Routes />
          </Navigation>
        </Resident51Contexts>
      </Router>
    </React.Fragment>
  );
};

export default App;
