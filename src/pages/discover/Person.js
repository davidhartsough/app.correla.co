import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from "../../components/AccountIcon";
import PlaceIcon from "../../components/PlaceIcon";
import "./Person.css";

export default ({ person }) => (
  <Link to={`/p/${person.username}`} className="person-item">
    <div className="person-item-top">
      <div className="person-item-section">
        <div className="person-item-section-icon">
          <AccountIcon />
        </div>
        <div className="person-item-section-text person-name">
          {person.name}
        </div>
      </div>
      {!!person.locationName && (
        <div className="person-item-section person-city">
          <div className="person-item-section-icon">
            <PlaceIcon />
          </div>
          <div className="person-item-section-text">{person.locationName}</div>
        </div>
      )}
    </div>
    {!!person.identitiesString &&
      !!person.identitiesString.length && (
        <div className="person-item-identities">{person.identitiesString}</div>
      )}
  </Link>
);
