import { peopleCollection } from "./client";

const requestProfile = () => ({ type: "REQUEST_PROFILE" });

const receiveProfile = profile => ({
  type: "RECEIVE_PROFILE",
  profile
});

export const fetchProfile = username => dispatch => {
  dispatch(requestProfile());
  return peopleCollection
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
    .then(profile => dispatch(receiveProfile(profile)));
};
