import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import { requestSuggestion, receiveSuggestion } from "./username";
import { getName } from "./person";

export const requestAuth = () => ({ type: "REQUEST_AUTH" });

export const receiveAuth = ({ isLoggedIn, isAnonymous }) => ({
  type: "RECEIVE_AUTH",
  isLoggedIn,
  isAnonymous
});

export const handleInitialAuth = auth => dispatch => {
  dispatch(requestAuth());
  dispatch(requestSuggestion());
  const isAnonymous = auth.user.loggedInProviderType === "anon-user";
  dispatch(
    receiveAuth({
      isLoggedIn: auth.isLoggedIn,
      isAnonymous
    })
  );
  if (!isAnonymous) {
    const { name, firstName, lastName } = auth.user.profile;
    const fullName = getName(name, firstName, lastName);
    const suggestion = fullName.toLowerCase().replace(/ /g, "-");
    dispatch(receiveSuggestion(suggestion));
  }
};

export const handleAuth = auth => dispatch => {
  dispatch(requestAuth());
  dispatch(requestSuggestion());
  return auth
    .handleRedirectResult()
    .asArray()
    .then(result => {
      dispatch(
        receiveAuth({
          isLoggedIn: true,
          isAnonymous: false
        })
      );
      const { name, firstName, lastName } = result.profile;
      const fullName = getName(name, firstName, lastName);
      const suggestion = fullName.toLowerCase().replace(/ /g, "-");
      dispatch(receiveSuggestion(suggestion));
    });
};

export const loginAnonymously = auth => dispatch => {
  dispatch(requestAuth());
  auth.loginWithCredential(new AnonymousCredential()).then(() => {
    dispatch(
      receiveAuth({
        isLoggedIn: true,
        isAnonymous: true
      })
    );
  });
};
