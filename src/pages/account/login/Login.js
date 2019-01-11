import React from "react";
import GoogleIcon from "./GoogleIcon";
import FacebookIcon from "./FacebookIcon";
import "./Login.css";

export default ({ loginWithGoogle, loginWithFacebook }) => (
  <section id="sign-in">
    <div className="center">
      <h1 className="title">Sign in</h1>
      <button
        className="button sign-in-button google-sign-in"
        onClick={loginWithGoogle}
      >
        <GoogleIcon />
        <span className="sign-in-button-text">Continue with Google</span>
      </button>
      <button
        className="button sign-in-button facebook-sign-in"
        onClick={loginWithFacebook}
      >
        <FacebookIcon />
        <span className="sign-in-button-text">Continue with Facebook</span>
      </button>
    </div>
  </section>
);
