import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Resident51Contexts from './Contexts';
import Navigation from './Components/Layout/Navigation';
import Routes from './Components/Routes';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Resident51Contexts>
        <Navigation>
          <Routes />
        </Navigation>
      </Resident51Contexts>
    </Router>
  );
};

export default App;
