import { connect } from "react-redux";
import AccountLink from "./AccountLink";

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AccountLink);
