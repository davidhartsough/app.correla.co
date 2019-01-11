import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";
import { fetchPerson } from "../../../store/actions/person";
import AccountModal from "./AccountModal";

const mapStateToProps = ({ person }) => ({ person });
const mapDispatchToProps = { fetchPerson, logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModal);
