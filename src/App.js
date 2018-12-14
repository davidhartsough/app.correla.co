import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Search from "./pages/search";
import Discover from "./pages/discover";
import Person from "./pages/p";

const NoMatch = () => <Redirect to="/" />;

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/discover/:search" component={Discover} />
      <Route path="/p/:id" component={Person} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);
