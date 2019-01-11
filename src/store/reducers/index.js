import { combineReducers } from "redux";
import person from "./person";
import people from "./people";
import profile from "./profile";
import auth from "./auth";
import username from "./username";

export default combineReducers({
  person,
  people,
  profile,
  auth,
  username
});
