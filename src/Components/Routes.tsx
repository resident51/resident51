import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import LogIn from './Login';
import NotFound from './NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={LogIn} path="/login/" exact />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
