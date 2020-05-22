import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from './Components/Layout/Navigation';
import Resident51Contexts from './Contexts';
import Routes from './Components/Routes';

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
