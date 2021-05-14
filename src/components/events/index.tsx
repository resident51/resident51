import React from 'react';

import { Route } from 'react-router-dom';

import CreateEvent from './CreateEvent';
import Events from './Events';

const Routes: React.FC = () => (
  <React.Fragment>
    <Route component={Events} path="/events" exact />
    <Route component={CreateEvent} path="/events/create" exact />
  </React.Fragment>
);

export default Routes;
