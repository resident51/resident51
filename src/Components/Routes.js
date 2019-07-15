import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Events from "./Events";
import Halls from "./Halls";
import Legacy from "./Legacy";
import Community from "./Community";
import Feedback from "./Feedback";
import LogIn from "./Login";
import NotFound from "./NotFound";

const Routes = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/events/" component={Events} />
      <Route path="/halls/" component={Halls} />
      <Route path="/legacy/" component={Legacy} />
      <Route path="/community/" component={Community} />
      <Route path="/feedback/" component={Feedback} />
      <Route path="/login/" component={LogIn} />
      <Route component={NotFound} />
    </Switch>
  );

export default Routes;
