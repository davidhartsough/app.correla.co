import React from "react";
import PageLoader from "../../components/PageLoader";
import Profile from "./Profile";

const verify = data => (!!data && !!data.length ? data : false);

const getLinks = (links, email) => {
  const linkList = !!links ? links : [];
  if (!!email) {
    linkList.unshift({
      name: "Email",
      url: `mailto:${email}`
    });
  }
  return linkList;
};

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
    if (Object.keys(data).length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          {`No person found with the username "${username}".`}
        </div>
      );
    }
    const links = getLinks(verify(data.links), verify(data.email));
    return (
      <Profile
        name={data.name}
        birthday={data.showAge ? data.birthday : false}
        locationName={verify(data.locationName)}
        identities={verify(data.identities)}
        links={verify(links)}
      />
    );
  }
}
