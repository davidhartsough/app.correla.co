import React from "react";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import mockData from "../../mockData";
import Profile from "./Profile";

export default class Person extends React.Component {
  state = {
    person: false,
    hasLoaded: false
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    if (id && id.length) {
      const person = mockData.people[id];
      if (person) {
        this.setState({ person, hasLoaded: true });
      } else {
        this.setState({ hasLoaded: true });
      }
    } else {
      this.setState({ hasLoaded: true });
    }
  }

  render() {
    const { person, hasLoaded } = this.state;
    return (
      <Layout>
        {hasLoaded ? (
          person ? (
            <Profile
              name={person.name}
              birthday={person.birthday}
              location={person.location}
              identities={person.identities || []}
              email={person.email}
              links={person.links || []}
            />
          ) : (
            <div>Nobody home...</div>
          )
        ) : (
          <div style={{ padding: "2rem" }}>
            <Loader size={5} />
          </div>
        )}
      </Layout>
    );
  }
}
