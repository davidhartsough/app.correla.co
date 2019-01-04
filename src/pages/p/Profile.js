import React from "react";
import CakeIcon from "../../components/CakeIcon";
import PlaceIcon from "../../components/PlaceIcon";
import "./Profile.css";

const calculateAge = birthday => {
  const ageDate = new Date(Date.now() - birthday);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default ({ name, birthday, locationName, identities, email, links }) => (
  <>
    <section id="profile">
      <h1 id="name">{name}</h1>
      {(!!birthday || !!locationName) && (
        <h2 className="sub">
          {!!birthday && (
            <span className="sub-span">
              <CakeIcon />
              {calculateAge(birthday)}
            </span>
          )}
          {!!locationName && (
            <span className="sub-span">
              <PlaceIcon />
              {locationName}
            </span>
          )}
        </h2>
      )}
      <div id="identities" className="chips">
        {identities.map((identity, index) => (
          <div key={`${identity}-${index}`} className="chip">
            <span className="chip-span">{identity}</span>
          </div>
        ))}
      </div>
    </section>
    {(!!email || !!links.length) &&
      !!identities.length && <hr className="hr" />}
    {(!!email || !!links.length) && (
      <section id="links" className="chips">
        {!!email && (
          <a
            id="email"
            className="link-chip"
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="chip-span">{email}</span>
          </a>
        )}
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
      </section>
    )}
  </>
);
