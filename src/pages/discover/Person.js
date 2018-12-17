import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from "../../components/AccountIcon";
import PlaceIcon from "../../components/PlaceIcon";
import "./Person.css";

export default ({ person }) => (
  <Link to={`/p/${person.username}`} className="person-item">
    <div className="person-item-section">
      <div className="person-item-section-icon">
        <AccountIcon />
      </div>
      <div className="person-item-section-text person-name">{person.name}</div>
    </div>
    {!!person.location && (
      <div className="person-item-section person-city">
        <div className="person-item-section-icon">
          <PlaceIcon />
        </div>
        <div className="person-item-section-text">{person.location}</div>
      </div>
    )}
  </Link>
);
