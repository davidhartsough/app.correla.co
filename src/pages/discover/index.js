import React from "react";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import People from "./People";

const getMilliseconds = age => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - age);
  return d.getTime();
};

export default class Person extends React.Component {
  state = {
    people: false
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
    const hasMin =
      searchParams.min &&
      searchParams.min.length &&
      !isNaN(Number(searchParams.min));
    const hasMax =
      searchParams.max &&
      searchParams.max.length &&
      !isNaN(Number(searchParams.max));
    if (hasMin || hasMax) {
      query["birthday"] = {};
      if (hasMin) {
        const minAge = Number(searchParams.min);
        query["birthday"]["$gte"] = getMilliseconds(minAge);
      }
      if (hasMax) {
        const maxAge = Number(searchParams.max);
        query["birthday"]["$lte"] = getMilliseconds(maxAge);
      }
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
    const client = Stitch.defaultAppClient;
    const db = client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("correla");
    const peopleDB = db.collection("people");
    if (client.auth.isLoggedIn) {
      this.getPeople(peopleDB, query);
    } else {
      client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
        this.getPeople(peopleDB, query);
      });
    }
  }

  getPeople = (peopleDB, query) => {
    peopleDB
      .find(query, {
        limit: 50,
        projection: {
          name: 1,
          username: 1,
          locationName: 1
        }
      })
      .asArray()
      .then(people => {
        console.log(people);
        this.setState({ people });
      });
  };

  render() {
    const { people } = this.state;
    return (
      <Layout>
        {people ? (
          <People people={people} />
        ) : (
          <div style={{ padding: "2rem" }}>
            <Loader size={5} />
          </div>
        )}
      </Layout>
    );
  }
}
