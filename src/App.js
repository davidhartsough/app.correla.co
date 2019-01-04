import React from "react";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import AccountIcon from "./components/AccountIcon";
import Search from "./pages/search";
import Discover from "./pages/discover";
import Person from "./pages/p";
import Account from "./pages/account";

const NoMatch = () => <Redirect to="/" />;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.client = Stitch.initializeDefaultAppClient("correla-lptqk");
    this.peopleCollection = this.client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("correla").collection("people");
    this.state = {
      isLoggedIn: this.client.auth.isLoggedIn
    };
  }

  componentDidMount() {
    if (this.client.auth.hasRedirectResult()) {
      this.client.auth
        .handleRedirectResult()
        .then(result => {
          console.log(result);
          this.setState({ isLoggedIn: true });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  logout = () => {
    this.client.auth.logout().then(() => this.setState({ isLoggedIn: false }));
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Router>
        <header>
          <nav>
            <div className="nav-link-c">
              <Link to="/" className="nav-link">
                Correla
              </Link>
            </div>
            <div className="nav-link-c nav-right">
              {isLoggedIn ? (
                <>
                  <button className="nav-link">
                    <AccountIcon />
                  </button>
                  <div className="account-modal">
                    <Link to={`/p/${}`} className="modal-item">
                      Edit profile
                    </Link>
                    <Link to="/account" className="modal-item">
                      Edit profile
                    </Link>
                  </div>
                </>
              ) : (
                <Link to="/account" className="nav-link">
                  <AccountIcon />
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/discover" component={Discover} />
            <Route path="/p/:username" component={Person} />
            <Route path="/account" component={Account} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </Router>
    );
  }
}
