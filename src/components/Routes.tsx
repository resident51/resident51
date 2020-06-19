import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Events from './Events';
import NotFound from './NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Events} path="/events" exact />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
