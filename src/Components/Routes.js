import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Events from "./Events";
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import EventSubmitted from './EventSubmitted';
import Halls from "./Halls";
import Legacy from "./Legacy";
import Community from "./Community";
import Feedback from "./Feedback";
import LogIn from "./Login";
import Profile from './Profile';
import NotFound from "./NotFound";

const Routes = () => (
  <Switch>
    <Route component={Home}           path="/" exact />
    <Route component={Events}         path="/events/" exact />
    <Route component={CreateEvent}    path="/events/create" exact />
    <Route component={EventSubmitted} path="/events/submitted" exact />
    <Route component={EditEvent}      path="/events/edit/:id" exact />
    <Route component={EventSubmitted} path="/events/delete/:id" exact />
    <Route component={Halls}          path="/halls/" exact />
    <Route component={Legacy}         path="/legacy/" exact />
    <Route component={Community}      path="/community/" exact />
    <Route component={Feedback}       path="/feedback/" exact />
    <Route component={LogIn}          path="/login/" exact />
    <Route component={Profile}        path="/profile/" exact />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
