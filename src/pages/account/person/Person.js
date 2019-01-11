import React from "react";
import DatePicker from "react-datepicker";
import LinkItem from "./LinkItem";
import "react-datepicker/dist/react-datepicker.css";
import "./Person.css";

const today = new Date();
const minDate = new Date("1901-01-01");

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    const p = props.person;
    this.state = {
      name: p.name || "",
      locationName: p.locationName || "",
      showAge: p.showAge,
      birthday: p.birthday,
      birthdayInput: !!p.birthday ? new Date(p.birthday) : null,
      email: p.email || "",
      identitiesInput:
        !!p.identities && p.identities.length ? p.identities.join(", ") : "",
      links: !!p.links && p.links.length ? p.links : [],
      newLinkName: "",
      newLinkUrl: ""
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  handleBdayChange = date => {
    this.setState({
      birthday: date.getTime(),
      birthdayInput: date
    });
  };

  handleCheckboxChange = ({ target }) => {
    const showAge = target.checked;
    this.setState({
      showAge
    });
  };

  addLink = () => {
    const { newLinkName, newLinkUrl } = this.state;
    if (newLinkName.length && newLinkUrl.length) {
      this.setState(prevState => ({
        newLinkName: "",
        newLinkUrl: "",
        links: [
          ...prevState.links,
          {
            name: prevState.newLinkName,
            url: prevState.newLinkUrl
          }
        ]
      }));
    }
  };

  updateLink = (index, updatedLink) => {
    this.setState(prevState => {
      const { links } = prevState;
      links.splice(index, 1, updatedLink);
      return {
        links
      };
    });
  };

  save = () => {
    // console.log(this.state);
    const updates = this.state;
    this.props.updatePerson(updates);
  };

  render() {
    const {
      name,
      locationName,
      showAge,
      birthdayInput,
      email,
      identitiesInput,
      links,
      newLinkName,
      newLinkUrl
    } = this.state;
    return (
      <section id="account">
        <h1 className="title">Account</h1>
        <h2 className="subtitle">Edit your profile.</h2>
        <div className="account-form">
          <div className="account-form-group">
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
          <div className="account-form-group">
            <label htmlFor="location-input">Location</label>
            <input
              type="text"
              id="location-input"
              name="locationName"
              placeholder="Location"
              value={locationName}
              maxLength="120"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="account-form-group">
            <label htmlFor="email-input">Email</label>
            <input
              type="text"
              id="email-input"
              name="email"
              placeholder="Email"
              value={email}
              maxLength="120"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="age-group">
            <div className="account-form-group show-age-group">
              <input
                type="checkbox"
                id="showAge"
                name="showAge"
                checked={showAge}
                onChange={this.handleCheckboxChange}
              />
              <label htmlFor="showAge">Show age</label>
            </div>
            <div className="account-form-group">
              <label htmlFor="birthday-input">Birthday</label>
              <DatePicker
                id="birthday-input"
                placeholderText="Birthday"
                minDate={minDate}
                maxDate={today}
                dateFormat="MMMM d, yyyy"
                selected={birthdayInput}
                onChange={this.handleBdayChange}
                disabled={!showAge}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
          <div className="links-group">
            <p className="form-group-title">Links</p>
            {links.length < 8 && (
              <div className="new-link">
                <div className="new-link-group">
                  <div className="account-form-group">
                    <label htmlFor="newLinkName-input">Name</label>
                    <input
                      type="text"
                      id="newLinkName-input"
                      name="newLinkName"
                      placeholder="Name"
                      value={newLinkName}
                      maxLength="120"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="account-form-group">
                    <label htmlFor="newLinkUrl-input">URL</label>
                    <input
                      type="text"
                      id="newLinkUrl-input"
                      name="newLinkUrl"
                      placeholder="URL"
                      value={newLinkUrl}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <button className="button add-link" onClick={this.addLink}>
                  Add new link
                </button>
              </div>
            )}
            {!!links.length ? (
              <div className="link-list">
                {links.map((link, index) => (
                  <LinkItem
                    key={`${link.name}-${link.url}-${index}`}
                    name={link.name}
                    url={link.url}
                    index={index}
                    updateLink={this.updateLink}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-link-list">No links added yet.</div>
            )}
          </div>
          <div className="identities">
            <p className="form-group-title">Identities</p>
            <div className="account-form-group identities-group">
              <textarea
                type="text"
                id="identities-input"
                name="identitiesInput"
                placeholder="Identities"
                maxLength="200"
                value={identitiesInput}
                onChange={this.handleInputChange}
              />
            </div>
            <p className="identities-input-helper-text">
              Separate identities with a comma.
            </p>
            {!!identitiesInput.trim().length ? (
              <div className="identity-chips chips">
                {identitiesInput
                  .trim()
                  .split(",")
                  .map((identity, index) => {
                    if (identity.replace(",", "").trim().length) {
                      return (
                        <div key={`${identity}-${index}`} className="chip">
                          <span className="chip-span">
                            {identity.replace(",", "").trim()}
                          </span>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
              </div>
            ) : (
              <div className="empty-identities">No identities added yet.</div>
            )}
          </div>
          <div id="save">
            <button className="button save" onClick={this.save}>
              Save
            </button>
          </div>
        </div>
      </section>
    );
  }
}
