import React from "react";
import { Stitch } from "mongodb-stitch-browser-sdk";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Search from "./pages/search";
import Discover from "./pages/discover";
import Person from "./pages/p";

Stitch.initializeDefaultAppClient("correla-lptqk");

const NoMatch = () => <Redirect to="/" />;

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/discover" component={Discover} />
      <Route path="/p/:username" component={Person} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);
