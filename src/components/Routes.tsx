import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import LogIn from './Login';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={LogIn} path="/login/" exact />
    <Route component={(): React.ReactElement<HTMLElement> => <a href="/">404</a>} />
  </Switch>
);

export default Routes;
