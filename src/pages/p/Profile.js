import React from "react";
// import EmailIcon from "./EmailIcon";
import "./Profile.css";

const calculateAge = birthday => {
  const ageDate = new Date(Date.now() - birthday);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

/*
const urlPrettify = url => {
  const wwwIndex = url.indexOf("://www.");
  const index = wwwIndex > 0 ? wwwIndex + 7 : url.indexOf("://") + 3;
  const trimmedUrl = url.substring(index);
  if (trimmedUrl.length > 40) {
    return `${trimmedUrl.substr(0, 39)}...`;
  }
  if (trimmedUrl.lastIndexOf("/") === trimmedUrl.length - 1) {
    return trimmedUrl.slice(0, -1);
  }
  return trimmedUrl;
};
const IconLinkChip = ({ link, icon }) => (
  <a
    className="link-chip icon-link-chip"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
    <span className="chip-span">{urlPrettify(link)}</span>
  </a>
);
*/

const getHumanDetails = birthday => {
  if (!birthday) {
    return "Human person";
  }
  return `${calculateAge(birthday)}-year-old human`;
};

export default ({ name, birthday, location, identities, email, links }) => (
  <>
    <section id="profile">
      <h1 id="name">{name}</h1>
      <div id="identities" className="chips">
        <div className="chip">
          <span className="chip-span">{getHumanDetails(birthday)}</span>
        </div>
        {!!location && (
          <div className="chip">
            <span className="chip-span">{location}</span>
          </div>
        )}
        {identities.map((identity, index) => (
          <div key={`${identity}-${index}`} className="chip">
            <span className="chip-span">{identity}</span>
          </div>
        ))}
      </div>
    </section>
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
