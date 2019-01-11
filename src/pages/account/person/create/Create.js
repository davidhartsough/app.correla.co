import React from "react";
import PageLoader from "../../../../components/PageLoader";
import "./Create.css";

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    const { suggestion } = props.username;
    this.state = {
      usernameInput: suggestion,
      lastInput: false
    };
    this.isCreatingPerson = false;
    this.receivedSuggestion = !!suggestion.length;
  }

  componentDidUpdate(prevProps) {
    const { username, createPerson } = this.props;
    const { isFetching, isChecking, isUnique, suggestion } = username;
    if (isFetching || isChecking) {
      return;
    }
    const { lastInput, usernameInput } = this.state;
    if (!prevProps.username.isUnique && isUnique && !this.isCreatingPerson) {
      this.isCreatingPerson = true;
      createPerson(lastInput);
      return;
    }
    if (
      prevProps.username.suggestion === "" &&
      suggestion !== "" &&
      usernameInput === "" &&
      !this.receivedSuggestion
    ) {
      this.receivedSuggestion = true;
      this.setState({
        usernameInput: suggestion
      });
    }
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      usernameInput: value
    });
  };

  tryNext = () => {
    const { checkUsername } = this.props;
    const { usernameInput } = this.state;
    checkUsername(usernameInput);
    this.setState(state => ({ lastInput: state.usernameInput }));
  };

  render() {
    const { isFetching, isChecking, isUnique } = this.props.username;
    const { usernameInput, lastInput } = this.state;
    if (isFetching) {
      return <PageLoader />;
    }
    return (
      <section id="create-profile">
        <h1 className="title">Choose a username</h1>
        {isChecking ? (
          <PageLoader />
        ) : isUnique && !!lastInput ? (
          <>
            <p className="congrats">
              {`Congrats! The username "${lastInput}" is yours!`}
              <br />
              Creating your profile now...
            </p>
            <PageLoader />
          </>
        ) : (
          <>
            <input
              type="text"
              className="username-input"
              name="username"
              placeholder="Username"
              value={usernameInput}
              maxLength="120"
              onChange={this.handleInputChange}
            />
            <p className="username-helper-text">
              {!!lastInput
                ? `Sorry, "${lastInput}" is already taken.`
                : "If the username is available, you can keep it!"}
            </p>
            <button className="button next" onClick={this.tryNext}>
              Next
            </button>
          </>
        )}
      </section>
    );
  }
}
