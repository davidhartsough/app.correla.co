import { connect } from "react-redux";
import { fetchPeople } from "../../store/actions/people";
import Page from "./page";

const mapStateToProps = ({ people }) => ({ people });
const mapDispatchToProps = { fetchPeople };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
