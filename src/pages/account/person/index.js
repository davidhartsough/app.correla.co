import { connect } from "react-redux";
import { updatePerson } from "../../../store/actions/person";
import Page from "./page";

const mapStateToProps = ({ person }) => ({ person });
const mapDispatchToProps = { updatePerson };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
