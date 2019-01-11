import { connect } from "react-redux";
import { createPerson } from "../../../../store/actions/person";
import { checkUsername } from "../../../../store/actions/username";
import Create from "./Create";

const mapStateToProps = ({ username }) => ({ username });
const mapDispatchToProps = { createPerson, checkUsername };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
