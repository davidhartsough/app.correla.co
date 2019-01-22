import React from "react";
import DatePicker from "react-datepicker";
import Autocomplete from "react-google-autocomplete";
import LinkItem from "./LinkItem";
import "react-datepicker/dist/react-datepicker.css";
import "./Person.css";

const exampleIdentities = [
  "Dad, Husband, Activist, Photographer, Producer, NYU alum, ENFP",
  "Basketball player, ",
  "Motorcyclist, "
];
const linkNamePlaceholder = ["Twitter", "My Website", "Facebook", "Spotify"];
const linkUrlPlaceholder = [
  "https://twitter.com/account",
  "https://mywebsite.com/",
  "https://www.facebook.com/username",
  "https://open.spotify.com/user/account"
];

const today = new Date();
const minDate = new Date("1901-01-01");
const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
// const emailPattern = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@(([a-z\-0-9]+\.)+[a-z]{2,6})$/;
// const emailPattern = /^.+@.+$/;
const emailPattern = /^.+@(([a-z\-0-9]+\.)+[a-z]{2,6})$/;

const convertLinksToString = links =>
  links.map(link => link.name + link.url).join();

const getUpdates = (prev, next) => {
  const updates = {};
  if (prev.name !== next.name) {
    updates.name = next.name;
    updates.nameSearch = next.name.toUpperCase().split(" ");
  }
  if (prev.locationName !== next.locationName) {
    updates.locationName = next.locationName;
    updates.location = {
      type: "Point",
      coordinates: next.coordinates
    };
  }
  if (prev.showAge !== next.showAge) {
    updates.showAge = next.showAge;
  }
  const nextBday = !!next.birthdayInput ? next.birthdayInput.getTime() : false;
  if (nextBday && prev.birthday !== nextBday) {
    updates.birthday = nextBday;
  }
  if (prev.email !== next.email) {
    updates.email = next.email;
  }
  const prevIdentitiesString =
    !!prev.identities && !!prev.identities.length
      ? prev.identities.join(", ")
      : "";
  if (prevIdentitiesString !== next.identitiesInput) {
    if (next.identitiesInput.trim().length) {
      const newIdentitiesArray = next.identitiesInput
        .trim()
        .split(",")
        .map(id => id.replace(",", "").trim());
      updates.identities = newIdentitiesArray;
      updates.identitiesSearch = newIdentitiesArray.map(id => id.toUpperCase());
    } else {
      updates.identities = [];
      updates.identitiesSearch = [];
    }
  }
  if (convertLinksToString(prev.links) !== convertLinksToString(next.links)) {
    updates.links = next.links;
  }
  return updates;
};

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
      newLinkUrl: "",
      newLinkUrlError: false,
      emailError: false
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  handleUrlChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      newLinkUrlError: !urlPattern.test(value)
    });
  };

  handleEmailChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      emailError: !emailPattern.test(value)
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

  onPlaceSelected = place => {
    this.setState({
      locationName: place.formatted_address,
      coordinates: [
        place.geometry.location.lng(),
        place.geometry.location.lat()
      ]
    });
  };

  save = () => {
    const { person, updatePerson } = this.props;
    const updates = getUpdates(person, this.state);
    console.log(updates);
    if (Object.keys(updates).length > 0) {
      console.log("do it");
      updatePerson(person._id, updates);
    }
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
      newLinkUrl,
      newLinkUrlError,
      emailError
    } = this.state;
    return (
      <section id="account">
        <h1 className="title">Account</h1>
        <h2 className="subtitle">Edit your profile.</h2>
        <div className="account-form">
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
            <label htmlFor="location-input">Location</label>
            <Autocomplete
              onPlaceSelected={this.onPlaceSelected}
              type="text"
              id="location-input"
              name="locationName"
              placeholder="Location"
              maxLength="120"
              defaultValue={locationName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email-input">Email</label>
            <input
              type="email"
              id="email-input"
              name="email"
              className={`email-input${emailError ? " error" : ""}`}
              placeholder="Email"
              value={email}
              maxLength="120"
              onChange={this.handleEmailChange}
            />
          </div>
          {emailError && (
            <p className="email-input-error">Please enter a email.</p>
          )}
          <div id="age-group">
            <div id="show-age-group" className="form-group flex-align-center">
              <input
                type="checkbox"
                id="showAge"
                name="showAge"
                checked={showAge}
                onChange={this.handleCheckboxChange}
              />
              <label
                id="show-age-label"
                className="checkbox-label"
                htmlFor="showAge"
              >
                Show age
              </label>
            </div>
            <div className="form-group">
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
                  <div className="form-group">
                    <label htmlFor="newLinkName-input">Name</label>
                    <input
                      type="text"
                      id="newLinkName-input"
                      name="newLinkName"
                      placeholder={linkNamePlaceholder[0]}
                      value={newLinkName}
                      maxLength="120"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newLinkUrl-input">URL</label>
                    <input
                      type="text"
                      id="newLinkUrl-input"
                      name="newLinkUrl"
                      className={newLinkUrlError ? " error" : ""}
                      placeholder={linkUrlPlaceholder[0]}
                      value={newLinkUrl}
                      onChange={this.handleUrlChange}
                    />
                  </div>
                </div>
                {newLinkUrlError && (
                  <p id="url-input-error">Please enter a valid URL.</p>
                )}
                <button
                  id="add-link"
                  className="button"
                  onClick={this.addLink}
                  disabled={newLinkUrlError}
                >
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
              <div className="empty-link-list">
                Add links to your profiles and accounts on social media and
                other websites.
              </div>
            )}
          </div>
          <div className="identities">
            <p className="form-group-title">Identities</p>
            <div className="form-group identities-group">
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
            <p className="input-helper-text mt">
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
              <div className="empty-identities">
                Add identities that describe you.
                <br />
                (Example: {exampleIdentities[0]})
              </div>
            )}
          </div>
          <div id="save">
            <button
              id="save-button"
              className="button primary-action"
              onClick={this.save}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    );
  }
}
