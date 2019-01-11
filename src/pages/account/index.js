import { connect } from "react-redux";
import Page from "./page";

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Page);
