import React from "react";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Profile from "./Profile";

export default class Person extends React.Component {
  state = {
    person: false,
    hasLoaded: false
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    const client = Stitch.defaultAppClient;
    const db = client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("correla");
    const people = db.collection("people");
    if (client.auth.isLoggedIn) {
      this.getPerson(people, username);
    } else {
      client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
        this.getPerson(people, username);
      });
    }
  }

  getPerson = (people, username) => {
    people
      .find(
        { username },
        {
          limit: 1,
          projection: {
            name: 1,
            birthday: 1,
            locationName: 1,
            identities: 1,
            email: 1,
            links: 1
          }
        }
      )
      .first()
      .then(data => {
        console.log(data);
        if (data) {
          this.setState({
            person: data,
            hasLoaded: true
          });
        } else {
          this.setState({ hasLoaded: true });
        }
      });
  };

  render() {
    const { match } = this.props;
    const { person, hasLoaded } = this.state;
    return (
      <Layout>
        {hasLoaded ? (
          person ? (
            <Profile
              name={person.name}
              birthday={person.showAge ? person.birthday : false}
              locationName={person.locationName}
              identities={person.identities || []}
              email={person.email}
              links={person.links || []}
            />
          ) : (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              {`No person found with the username "${match.params.username}".`}
            </div>
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
