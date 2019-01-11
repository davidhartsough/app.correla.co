import {
  GoogleRedirectCredential,
  FacebookRedirectCredential
} from "mongodb-stitch-browser-sdk";
import { auth } from "./client";
import { loginAnonymously } from "./initAuth";

export const requestAuth = () => ({ type: "REQUEST_AUTH" });

export const receiveAuth = isLoggedIn => ({
  type: "RECEIVE_AUTH",
  isLoggedIn,
  isAnonymous: false
});

export const loginWithGoogle = () => dispatch => {
  dispatch(requestAuth());
  auth.loginWithRedirect(new GoogleRedirectCredential()).then(() => {
    dispatch(receiveAuth(true));
  });
};

export const loginWithFacebook = () => dispatch => {
  dispatch(requestAuth());
  auth.loginWithRedirect(new FacebookRedirectCredential()).then(() => {
    dispatch(receiveAuth(true));
  });
};

export const logout = () => dispatch => {
  dispatch(requestAuth());
  auth.logout().then(() => {
    dispatch(receiveAuth(false));
    dispatch(loginAnonymously(auth));
  });
};
