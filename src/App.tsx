import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Routes from 'components/Routes';
import { EventsProvider } from 'contexts/Events';
import { UserProvider } from 'contexts/User';

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
