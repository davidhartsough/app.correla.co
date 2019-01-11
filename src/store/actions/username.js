import { usernameCollection } from "./client";

const requestUsername = () => ({ type: "REQUEST_USERNAME" });

const receiveUsername = isUnique => ({
  type: "RECEIVE_USERNAME",
  isUnique
});

export const checkUsername = username => dispatch => {
  dispatch(requestUsername());
  return usernameCollection
    .find({ username }, { limit: 1, projection: { username: 1 } })
    .first()
    .then(data => {
      if (data && data.username && data.username.length) {
        dispatch(receiveUsername(false));
      } else {
        dispatch(receiveUsername(true));
      }
    });
};

export const requestSuggestion = () => ({ type: "REQUEST_SUGGESTION" });

export const receiveSuggestion = suggestion => ({
  type: "RECEIVE_SUGGESTION",
  suggestion
});
