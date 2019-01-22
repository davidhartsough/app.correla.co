import React from "react";
import CakeIcon from "../../components/CakeIcon";
import PlaceIcon from "../../components/PlaceIcon";
import "./Profile.css";

const calculateAge = birthday => {
  const ageDate = new Date(Date.now() - birthday);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default ({ name, birthday, locationName, identities, links }) => (
  <section id="profile">
    <h1 id="name-heading">{name}</h1>
    {(!!birthday || !!locationName) && (
      <h2 id="sub-heading">
        {!!birthday && (
          <span className="sub-span flex-align-center">
            <CakeIcon />
            {calculateAge(birthday)}
          </span>
        )}
        {!!locationName && (
          <span className="sub-span flex-align-center">
            <PlaceIcon />
            {locationName}
          </span>
        )}
      </h2>
    )}
    {!!identities && (
      <div id="identities" className="chips profile-section">
        {identities.map((identity, index) => (
          <div key={`${identity}-${index}`} className="chip">
            <span className="chip-span">{identity}</span>
          </div>
        ))}
      </div>
    )}
    {!!links && !!identities && <hr />}
    {!!links && (
      <div id="links" className="chips profile-section">
        {links.map(({ name, url }, index) => (
          <a
            className="link-chip"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={`${name}-${index}`}
          >
            <span className="chip-span">{name}</span>
          </a>
        ))}
      </div>
    )}
  </section>
);
