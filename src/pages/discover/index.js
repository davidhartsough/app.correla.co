import React from "react";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import People from "./People";

const mockData = [
  {
    id: "123",
    name: "David Hartsough",
    username: "davidhartsough",
    location: "Boise, ID",
    birthday: 765072000000
  },
  {
    id: "321",
    name: "Rebecca Robinson",
    username: "rebecca"
  },
  {
    id: "234",
    name: "Steven Stevens",
    username: "steven",
    location: "Meridian, ID",
    birthday: 798072000000
  }
];

export default class Person extends React.Component {
  state = {
    people: false,
    hasLoaded: false
  };

  componentDidMount() {
    const { location } = this.props;
    const urlSearchParams = new URLSearchParams(location.search);
    const searchParams = {
      name: urlSearchParams.get("name"),
      identities: urlSearchParams.get("identities"),
      min: urlSearchParams.get("min"),
      max: urlSearchParams.get("max"),
      nearMe: urlSearchParams.get("nearMe"),
      lat: urlSearchParams.get("lat"),
      lon: urlSearchParams.get("lon")
    };
    console.log(searchParams);
    const people = mockData;
    this.setState({
      people,
      hasLoaded: true
    });
  }

  render() {
    const { people, hasLoaded } = this.state;
    return (
      <Layout>
        {hasLoaded ? <People people={people} /> : <Loader size={5} />}
      </Layout>
    );
  }
}
