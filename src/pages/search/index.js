import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import "./Search.css";

export default class Search extends React.Component {
  state = {
    name: "",
    identities: "",
    min: "",
    max: "",
    nearMe: false,
    showNearMe: !!window.navigator.geolocation,
    requestCoords: false,
    loadingCoords: false,
    coords: false
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
      window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.setState({
          coords,
          loadingCoords: false
        });
      });
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

  getSearch = () => {
    const { name, identities, min, max, nearMe, coords } = this.state;
    let linkTo = "?";
    if (name) {
      linkTo += `name="${name.trim()}"&`;
    }
    if (identities) {
      linkTo += `identities="${identities.trim()}"&`;
    }
    if (min) {
      linkTo += `min=${min}&`;
    }
    if (max) {
      linkTo += `max=${max}&`;
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
      min,
      max,
      nearMe,
      showNearMe,
      loadingCoords,
      requestCoords,
      coords
    } = this.state;
    return (
      <Layout>
        <section id="search">
          <h1 className="title">Discover</h1>
          <h2 className="subtitle">Find amazing people.</h2>
          <div className="search-form">
            <div className="search-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                maxLength="120"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="search-form-group">
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
            <p className="input-helper-text">
              Separate identities with a comma.
            </p>
            <div className="search-form-group age-group">
              <label htmlFor="min">Age</label>
              <div className="age-range">
                <input
                  type="number"
                  id="min"
                  name="min"
                  placeholder="Min"
                  step={1}
                  min={1}
                  max={max || 99}
                  value={min}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="max" className="dash">
                  &ndash;
                </label>
                <input
                  type="number"
                  id="max"
                  name="max"
                  placeholder="Max"
                  step={1}
                  min={min || 1}
                  max={99}
                  value={max}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            {showNearMe && (
              <>
                <div className="search-form-group near-me-group">
                  <input
                    type="checkbox"
                    id="nearMe"
                    name="nearMe"
                    checked={nearMe}
                    onChange={this.handleCheckboxChange}
                    disabled={!loadingCoords && requestCoords && !coords}
                  />
                  <label htmlFor="nearMe">Near me</label>
                </div>
                <div className="location-helper-text">
                  {loadingCoords && (
                    <div className="location-loader">
                      <Loader size={1.125} />
                    </div>
                  )}
                  {loadingCoords
                    ? "Getting your location..."
                    : requestCoords
                      ? !!coords
                        ? "Location received."
                        : "Location request denied."
                      : "This option will ask for your location."}
                </div>
              </>
            )}
            <Link
              className="search-link"
              to={{
                pathname: "/discover",
                search: this.getSearch()
              }}
              disabled={loadingCoords}
            >
              Search
            </Link>
          </div>
        </section>
      </Layout>
    );
  }
}
