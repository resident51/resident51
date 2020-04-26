import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import LogIn from './Login';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={LogIn} path="/login/" exact />
    <Route component={() => <a href="/">404</a>} />
  </Switch>
);

export default Routes;
