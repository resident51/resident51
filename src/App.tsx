import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Routes from './Components/Routes';
import { EventsProvider } from './Contexts/Events';
import { UserProvider } from './Contexts/User';

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
    <>
      <CssBaseline />
      <Router>
        {/* R<span className="d-sm-inline d-none">esident </span>51 */}
        <UserProvider>
          <EventsProvider>
            <Routes />
          </EventsProvider>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;
