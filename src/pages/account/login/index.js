import { connect } from "react-redux";
import {
  loginWithGoogle,
  loginWithFacebook
} from "../../../store/actions/auth";
import Login from "./Login";

export default connect(
  null,
  { loginWithGoogle, loginWithFacebook }
)(Login);
