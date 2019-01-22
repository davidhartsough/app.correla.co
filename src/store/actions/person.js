import { peopleCollection, auth, usernameCollection } from "./client";

const requestPerson = () => ({ type: "REQUEST_PERSON" });

const receivePerson = person => ({
  type: "RECEIVE_PERSON",
  person
});

export const getName = (name, fname, lname) => {
  if (name && name.length) {
    return name;
  } else if ((fname && fname.length) || (lname && lname.length)) {
    let fullName = "";
    if (fname && fname.length) {
      fullName = fname;
    }
    if (lname && lname.length) {
      if (fullName.length) {
        fullName += " " + lname;
      } else {
        fullName = lname;
      }
    }
    return fullName;
  }
  return "";
};

export const createPerson = username => dispatch => {
  dispatch(requestPerson());
  const uid = auth.user.id;
  const p = auth.user.profile;
  const name = getName(p.name, p.firstName, p.lastName);
  return peopleCollection
    .insertOne({
      uid,
      username,
      name,
      nameSearch: name.length ? name.toUpperCase().split(" ") : [],
      birthday:
        p.birthday && p.birthday.length ? new Date(p.birthday).getTime() : null,
      _birthday: p.birthday && p.birthday.length ? p.birthday : null,
      showAge: !!(p.birthday && p.birthday.length),
      email: p.email && p.email.length ? p.email : null,
      identitiesSearch: [],
      identities: [],
      links: [],
      pictureUrl: p.pictureUrl && p.pictureUrl.length ? p.pictureUrl : null,
      _pictureUrl: p.pictureUrl,
      locationName: ""
    })
    .then(({ insertedId }) => {
      usernameCollection.insertOne({
        uid,
        username,
        pid: insertedId
      });
      peopleCollection
        .find({ _id: insertedId }, { limit: 1 })
        .first()
        .then(person => dispatch(receivePerson(person)));
    });
};

export const fetchPerson = () => dispatch => {
  dispatch(requestPerson());
  const uid = auth.user.id;
  return peopleCollection
    .find({ uid }, { limit: 1 })
    .first()
    .then(person => dispatch(receivePerson(person)));
};

export const updatePerson = (id, updates) => dispatch => {
  dispatch(requestPerson());
  console.log(updates);
  return peopleCollection
    .updateOne({ _id: id }, { $set: updates })
    .then(results => {
      console.log(results);
      peopleCollection
        .find({ _id: id }, { limit: 1 })
        .first()
        .then(person => dispatch(receivePerson(person)));
    });
};
