import React from "react";
import { connect } from "react-redux";
import {
  handleAuth,
  handleInitialAuth,
  loginAnonymously
} from "./actions/initAuth";

class Client extends React.Component {
  componentDidMount() {
    const { auth } = this.props.client;
    if (auth.hasRedirectResult()) {
      this.props.handleAuth(auth);
    } else {
      if (auth.isLoggedIn) {
        this.props.handleInitialAuth(auth);
      } else {
        this.props.loginAnonymously(auth);
      }
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect(
  null,
  {
    handleAuth,
    handleInitialAuth,
    loginAnonymously
  }
)(Client);
