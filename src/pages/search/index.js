import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import "./Search.css";

export default class Search extends React.Component {
  state = {
    name: "",
    identities: "",
    min: "",
    max: "",
    nearMe: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  getLinkTo = () => {
    const { name, identities, min, max, nearMe } = this.state;
    let linkTo = "/discover/?";
    if (name) {
      linkTo += `name="${name}",`;
    }
    if (identities) {
      linkTo += `identities="${identities}",`;
    }
    if (min) {
      linkTo += `min="${min}",`;
    }
    if (max) {
      linkTo += `max="${max}",`;
    }
    return `${linkTo}nearMe="${nearMe}"`;
  };

  render() {
    const { name, identities, min, max, nearMe } = this.state;
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
              Separate identities with a comma
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
            <div className="search-form-group near-me-group">
              <input
                type="checkbox"
                id="nearMe"
                name="nearMe"
                checked={nearMe}
                onChange={this.handleInputChange}
              />
              <label htmlFor="nearMe">Near me</label>
            </div>
            <Link className="search-link" to={this.getLinkTo()}>
              Search
            </Link>
          </div>
        </section>
      </Layout>
    );
  }
}
