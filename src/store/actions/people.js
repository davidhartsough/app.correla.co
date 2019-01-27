import { peopleCollection } from "./client";

const requestPeople = () => ({ type: "REQUEST_PEOPLE" });

const receivePeople = people => ({
  type: "RECEIVE_PEOPLE",
  people
});

export const fetchPeople = query => dispatch => {
  dispatch(requestPeople());
  return peopleCollection
    .find(query, {
      limit: 50,
      projection: {
        name: 1,
        username: 1,
        locationName: 1,
        identitiesString: 1
      }
    })
    .asArray()
    .then(people => dispatch(receivePeople(people)));
};
