import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Search from "./search";
import Discover from "./discover";
import Profile from "./p";
import Account from "./account";
import PageLoader from "../components/PageLoader";

const NoMatch = () => <Redirect to="/" />;

const Routes = ({ auth }) => {
  if (auth.isFetching || !auth.isLoggedIn) {
    return <PageLoader />;
  }
  return (
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/discover" component={Discover} />
      <Route path="/p/:username" component={Profile} />
      <Route path="/account" component={Account} />
      <Route component={NoMatch} />
    </Switch>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Routes);
