import React from "react";
import PageLoader from "../../components/PageLoader";
import Profile from "./Profile";

export default class Page extends React.Component {
  componentDidMount() {
    const { match, fetchProfile } = this.props;
    const { username } = match.params;
    fetchProfile(username);
  }

  render() {
    const { match, profile } = this.props;
    const { username } = match.params;
    const { isFetching, data } = profile;
    if (isFetching) {
      return <PageLoader />;
    }
    return Object.keys(data).length === 0 ? (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        {`No person found with the username "${username}".`}
      </div>
    ) : (
      <Profile
        name={data.name}
        birthday={data.showAge ? data.birthday : false}
        locationName={data.locationName}
        identities={data.identities}
        email={data.email}
        links={data.links}
      />
    );
  }
}
