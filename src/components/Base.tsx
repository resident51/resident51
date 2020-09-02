import React from 'react';

import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import EventsRoutes from './events';
import Home from './Home';
import NotFound from './NotFound';
import VerificationBanner from './auth/VerificationBanner';

import useStyles from './_jss/Base.jss';

const Base: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <VerificationBanner />
      <Container className={classes.container} fixed>
        <Switch>
          <Route component={Home} path="/" exact />
          <EventsRoutes />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
};

export default Base;
