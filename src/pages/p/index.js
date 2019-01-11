import { connect } from "react-redux";
import { fetchProfile } from "../../store/actions/profile";
import Page from "./page";

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = { fetchProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
