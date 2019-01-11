import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from "../AccountIcon";

export default () => (
  <Link to="/account" className="nav-link">
    <AccountIcon />
  </Link>
);
