import React from "react";
import PageLoader from "../../../../components/PageLoader";
import "./Create.css";

const usernamePattern = /^[a-z0-9-]{3,32}$/;

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    const { suggestion } = props.username;
    this.state = {
      usernameInput: suggestion,
      inputError: false,
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
      usernameInput: value,
      inputError: !usernamePattern.test(value)
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
    const { usernameInput, inputError, lastInput } = this.state;
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
            <p id="congrats">
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
              id="username-input"
              className={inputError ? "error" : ""}
              name="username"
              placeholder="Username"
              value={usernameInput}
              maxLength="32"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              onChange={this.handleInputChange}
            />
            {inputError ? (
              <p id="username-input-error" className="input-error-text">
                Usernames can only contain lowercase alphanumeric characters and
                hyphens and must be at least 3 characters long.
              </p>
            ) : (
              <p className="input-helper-text">
                {!!lastInput
                  ? `Sorry, "${lastInput}" is already taken.`
                  : "If the username is available, you can keep it!"}
              </p>
            )}
            <button
              id="next"
              className="button primary-action"
              onClick={this.tryNext}
              disabled={inputError}
            >
              Next
            </button>
          </>
        )}
      </section>
    );
  }
}
