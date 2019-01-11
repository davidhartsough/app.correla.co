import React from "react";
import PageLoader from "../../components/PageLoader";
import PersonPage from "./person";
import Login from "./login";

export default ({ auth }) => {
  const { isFetching, isLoggedIn, isAnonymous } = auth;
  if (isFetching) {
    return <PageLoader />;
  }
  if (isLoggedIn && !isAnonymous) {
    return <PersonPage />;
  }
  return <Login />;
};
