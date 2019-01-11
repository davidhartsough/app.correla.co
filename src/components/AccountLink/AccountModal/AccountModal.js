import React from "react";
import { Link } from "react-router-dom";
import AccountLoader from "../AccountLoader";
import LinkToAccount from "../LinkToAccount";
import AccountIcon from "../../AccountIcon";
import "./AccountModal.css";

export default class AccountModal extends React.Component {
  state = { open: false };

  componentDidMount() {
    this.props.fetchPerson();
  }

  toggleOpen = () => this.setState(state => ({ open: !state.open }));

  signOut = () => {
    this.toggleOpen();
    this.props.logout();
  };

  render() {
    const { person } = this.props;
    const { open } = this.state;
    const { isFetching, data } = person;
    if (isFetching) {
      return <AccountLoader />;
    }
    if (Object.keys(data).length === 0) {
      return <LinkToAccount />;
    }
    return (
      <div className="account-modal-container">
        <div className="nav-link" onClick={this.toggleOpen}>
          <AccountIcon />
        </div>
        {open && <div id="modal-overlay" onClick={this.toggleOpen} />}
        <div className={`account-modal${open ? " open" : ""}`}>
          <Link
            to={`/p/${data.username}`}
            className="modal-item"
            onClick={this.toggleOpen}
          >
            View profile
          </Link>
          <Link to="/account" className="modal-item" onClick={this.toggleOpen}>
            Edit profile
          </Link>
          <div className="modal-item" onClick={this.signOut}>
            Logout
          </div>
        </div>
      </div>
    );
  }
}
