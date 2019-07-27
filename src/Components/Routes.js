import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Events from "./Events";
import CreateEvent from './CreateEvent';
import Halls from "./Halls";
import Legacy from "./Legacy";
import Community from "./Community";
import Feedback from "./Feedback";
import LogIn from "./Login";
import Profile from './Profile';
import NotFound from "./NotFound";

import { giveEventTypesContext } from '../Contexts/EventTypesContext';
import { giveEventsContext } from "../Contexts/EventsContext";
import { giveHallsContext } from '../Contexts/HallsContext';

const Events__ = giveEventsContext(giveEventTypesContext(Events));
const CreateEvent__ = giveEventTypesContext(giveHallsContext(CreateEvent));
const Profile__ = giveEventsContext(giveEventTypesContext(Profile));

const Routes = () => (
  <Switch>
    <Route component={Home}           path="/" exact />
    <Route component={Events__}       path="/events/" exact />
    <Route component={CreateEvent__}  path="/events/create" exact />
    <Route component={Halls}          path="/halls/" exact />
    <Route component={Legacy}         path="/legacy/" exact />
    <Route component={Community}      path="/community/" exact />
    <Route component={Feedback}       path="/feedback/" exact />
    <Route component={LogIn}          path="/login/" exact />
    <Route component={Profile__}      path="/profile/" exact />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
