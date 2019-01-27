import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AccountLink from "./components/AccountLink";
import { DataProvider } from "./store";
import Search from "./pages/search";
import Discover from "./pages/discover";
import Profile from "./pages/p";
import Account from "./pages/account";
import "./App.css";

const NoMatch = () => <Redirect to="/" />;

export default () => (
  <DataProvider>
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <header>
          <nav>
            <div className="nav-link-c flex-align-center">
              <Link to="/" className="nav-link">
                Correla
              </Link>
            </div>
            <div className="nav-link-c nav-right flex-align-center">
              <AccountLink />
            </div>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/discover" component={Discover} />
            <Route path="/p/:username" component={Profile} />
            <Route path="/account" component={Account} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
    </Router>
  </DataProvider>
);
