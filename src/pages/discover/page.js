import React from "react";
import PageLoader from "../../components/PageLoader";
import People from "./People";

const getQueryFromSearch = search => {
  const urlSearchParams = new URLSearchParams(search);
  const searchParams = {
    name: urlSearchParams.get("name"),
    identities: urlSearchParams.get("identities"),
    nearMe: urlSearchParams.get("nearMe"),
    lat: urlSearchParams.get("lat"),
    lon: urlSearchParams.get("lon")
  };
  const query = {};
  if (searchParams.name && searchParams.name.length) {
    query["nameSearch"] = {
      $in: searchParams.name
        .replace(/"/gi, "")
        .toUpperCase()
        .split(" ")
        .map(n => n.trim())
    };
  }
  if (searchParams.identities && searchParams.identities.length) {
    query["identitiesSearch"] = {
      $in: searchParams.identities
        .replace(/"/gi, "")
        .toUpperCase()
        .split(",")
        .map(i => i.trim())
    };
  }
  if (
    searchParams.nearMe === "true" &&
    searchParams.lat &&
    searchParams.lat.length &&
    !isNaN(Number(searchParams.lat)) &&
    searchParams.lon &&
    searchParams.lon.length &&
    !isNaN(Number(searchParams.lon))
  ) {
    query["location"] = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [Number(searchParams.lon), Number(searchParams.lat)]
        },
        $maxDistance: 50000
      }
    };
  }
  return query;
};

export default class Page extends React.Component {
  componentDidMount() {
    const { location, fetchPeople } = this.props;
    const query = getQueryFromSearch(location.search);
    fetchPeople(query);
  }

  render() {
    const { people } = this.props;
    const { isFetching, data } = people;
    console.log(data);
    return isFetching ? <PageLoader /> : <People people={data} />;
  }
}
