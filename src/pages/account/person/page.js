import React from "react";
import PageLoader from "../../../components/PageLoader";
import Create from "./create";
import Person from "./Person";

export default ({ person, updatePerson }) => {
  const { isFetching, data } = person;
  if (isFetching) {
    return <PageLoader />;
  }
  if (Object.keys(data).length === 0) {
    return <Create />;
  }
  return <Person person={data} updatePerson={updatePerson} />;
};
