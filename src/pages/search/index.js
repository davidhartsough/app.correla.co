import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Search.css";

export default class Search extends React.Component {
  state = {
    name: "",
    identities: "",
    nearMe: false,
    showNearMe: !!window.navigator.geolocation,
    requestCoords: false,
    loadingCoords: false,
    coords: false,
    locationErrorMessage: ""
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = ({ target }) => {
    const nearMe = target.checked;
    const { requestCoords, loadingCoords } = this.state;
    if (nearMe && !requestCoords && !loadingCoords) {
      this.setState({
        loadingCoords: true,
        requestCoords: true,
        nearMe
      });
      window.navigator.geolocation.getCurrentPosition(
        this.getLocation,
        this.handleLocationError
      );
      return;
    }
    if (!nearMe && requestCoords && loadingCoords) {
      this.setState({
        loadingCoords: false,
        nearMe
      });
      return;
    }
    this.setState({ nearMe });
  };

  getLocation = ({ coords }) => {
    this.setState({
      coords,
      loadingCoords: false
    });
  };

  handleLocationError = error => {
    let locationErrorMessage = "An error occurred while getting your location.";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        locationErrorMessage = "You've denied requests for your location.";
        break;
      case error.POSITION_UNAVAILABLE:
        locationErrorMessage = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        locationErrorMessage = "The request to get your location timed out.";
        break;
      default:
        break;
    }
    this.setState({
      locationErrorMessage,
      nearMe: false,
      loadingCoords: false
    });
  };

  getSearch = () => {
    const { name, identities, nearMe, coords } = this.state;
    let linkTo = "?";
    if (name) {
      linkTo += `name="${name.trim()}"&`;
    }
    if (identities) {
      linkTo += `identities="${identities.trim()}"&`;
    }
    if (nearMe && coords) {
      linkTo += `nearMe=${nearMe}&lat=${coords.latitude}&lon=${
        coords.longitude
      }&`;
    }
    return linkTo.slice(0, -1);
  };

  render() {
    const {
      name,
      identities,
      nearMe,
      showNearMe,
      loadingCoords,
      requestCoords,
      coords,
      locationErrorMessage
    } = this.state;
    return (
      <section id="search">
        <h1 className="title">Discover</h1>
        <h2 className="subtitle">Find amazing people.</h2>
        <div id="search-form">
          <div className="form-group">
            <label htmlFor="name-input">Name</label>
            <input
              type="text"
              id="name-input"
              name="name"
              placeholder="Name"
              value={name}
              maxLength="120"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="identities">Identities</label>
            <input
              type="text"
              id="identities"
              name="identities"
              placeholder="Identities"
              value={identities}
              maxLength="120"
              onChange={this.handleInputChange}
            />
          </div>
          <p className="input-helper-text mtl">
            Separate identities with a comma.
          </p>
          {showNearMe && (
            <>
              <div className="form-group flex-align-center">
                <input
                  type="checkbox"
                  id="nearMe"
                  name="nearMe"
                  checked={nearMe}
                  onChange={this.handleCheckboxChange}
                  disabled={!loadingCoords && requestCoords && !coords}
                />
                <label className="checkbox-label mb" htmlFor="nearMe">
                  Near me
                </label>
              </div>
              <div className="input-helper-text mz">
                {loadingCoords && (
                  <div id="location-loader">
                    <Loader size={1.125} />
                  </div>
                )}
                {loadingCoords
                  ? "Getting your location..."
                  : requestCoords
                    ? !!coords
                      ? "Location received."
                      : locationErrorMessage
                    : "This option will ask for your location."}
              </div>
            </>
          )}
          <Link
            id="search-link"
            className="button primary-action"
            to={{
              pathname: "/discover",
              search: this.getSearch()
            }}
            disabled={
              loadingCoords ||
              (name.length < 1 && identities.length < 1 && !coords && !nearMe)
            }
          >
            Search
          </Link>
        </div>
      </section>
    );
  }
}
