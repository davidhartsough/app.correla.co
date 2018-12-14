import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from "./AccountIcon";
import "./Layout.css";

export default ({ children }) => (
  <>
    <header>
      <nav>
        <div className="nav-link-c">
          <Link to="/" className="nav-link">
            Correla
          </Link>
        </div>
        <div className="nav-link-c nav-right">
          <Link to="/" className="nav-link">
            <AccountIcon />
          </Link>
        </div>
      </nav>
    </header>
    <main>{children}</main>
  </>
);
