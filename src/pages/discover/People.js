import React from "react";
import Person from "./Person";
import "./People.css";

export default ({ people }) => (
  <section id="people">
    <h1 className="title">Discover</h1>
    <h2 className="subtitle">Find amazing people.</h2>
    {!!people.length ? (
      <div id="people-list">
        {people.map(person => (
          <Person key={person.username} person={person} />
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <p className="no-results">No one found for that search.</p>
      </div>
    )}
  </section>
);
