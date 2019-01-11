import React from "react";
import AccountModal from "./AccountModal";
import AccountLoader from "./AccountLoader";
import LinkToAccount from "./LinkToAccount";

export default ({ auth }) => {
  const { isFetching, isLoggedIn, isAnonymous } = auth;
  if (isFetching) {
    return <AccountLoader />;
  }
  if (isLoggedIn && !isAnonymous) {
    return <AccountModal />;
  }
  return <LinkToAccount />;
};
