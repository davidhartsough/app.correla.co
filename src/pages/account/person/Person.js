import React from "react";
import DatePicker from "react-datepicker";
import Autocomplete from "react-google-autocomplete";
import "react-datepicker/dist/react-datepicker.css";
import "./Person.css";

const linkNamePlaceholder = ["Twitter", "My Website", "Facebook", "Spotify"];
const linkUrlPlaceholder = [
  "https://twitter.com/account",
  "https://mywebsite.com/",
  "https://www.facebook.com/username",
  "https://open.spotify.com/user/account"
];
const getNextIndex = index => {
  return index >= 3 ? 0 : index + 1;
};

const today = new Date();
const minDate = new Date("1901-01-01");
const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
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
  if (prev.identitiesString !== next.identitiesInput) {
    if (next.identitiesInput.trim().length) {
      const newIdentitiesArray = next.identitiesInput
        .trim()
        .split(",")
        .map(id => id.replace(",", "").trim());
      updates.identities = newIdentitiesArray;
      updates.identitiesSearch = newIdentitiesArray.map(id => id.toUpperCase());
      updates.identitiesString = next.identitiesInput.trim();
    } else {
      updates.identitiesString = "";
      updates.identities = [];
      updates.identitiesSearch = [];
    }
  }
  if (convertLinksToString(prev.links) !== convertLinksToString(next.links)) {
    updates.links = next.links.filter(
      link => !!link.name.length && !!link.url.length
    );
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
      identitiesInput: p.identitiesString || "",
      links: !!p.links && p.links.length ? p.links : [],
      newLinkName: "",
      newLinkUrl: "",
      newLinkUrlError: false,
      linkPlaceholderIndex: Math.floor(Math.random() * 4),
      hasLinkUrlError: false,
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
      newLinkUrlError: value.length ? !urlPattern.test(value) : false
    });
  };

  handleEmailChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      emailError: value.length ? !emailPattern.test(value) : false
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
    if (
      newLinkName.length &&
      newLinkUrl.length &&
      urlPattern.test(newLinkUrl)
    ) {
      this.setState(prevState => ({
        newLinkName: "",
        newLinkUrl: "",
        links: [
          ...prevState.links,
          {
            name: prevState.newLinkName,
            url: prevState.newLinkUrl
          }
        ],
        linkPlaceholderIndex: getNextIndex(prevState.linkPlaceholderIndex)
      }));
    }
  };

  handleLinkNameChange = index => ({ target }) => {
    const { value } = target;
    this.setState(prevState => {
      const links = [...prevState.links];
      links.splice(index, 1, {
        ...prevState.links[index],
        name: value
      });
      return { links };
    });
  };

  handleLinkUrlChange = index => ({ target }) => {
    const { value } = target;
    this.setState(prevState => {
      const links = [...prevState.links];
      const updatedLink = {
        name: prevState.links[index].name,
        url: value
      };
      const urlError = !urlPattern.test(value);
      if (urlError) {
        updatedLink.urlError = true;
      }
      links.splice(index, 1, updatedLink);
      return {
        links,
        hasLinkUrlError: urlError && !!value.length
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
    if (Object.keys(updates).length > 0) {
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
      linkPlaceholderIndex,
      hasLinkUrlError,
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
            <p className="input-error-text">Please enter a valid email.</p>
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
            {links.length < 16 && (
              <div className="new-link">
                <div className="new-link-group">
                  <div className="form-group">
                    <label htmlFor="newLinkName-input">Name</label>
                    <input
                      type="text"
                      id="newLinkName-input"
                      name="newLinkName"
                      placeholder={linkNamePlaceholder[linkPlaceholderIndex]}
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
                      className={newLinkUrlError ? "error" : ""}
                      placeholder={linkUrlPlaceholder[linkPlaceholderIndex]}
                      value={newLinkUrl}
                      maxLength="240"
                      onChange={this.handleUrlChange}
                    />
                  </div>
                </div>
                {newLinkUrlError && (
                  <p className="url-input-error input-error-text">
                    Please enter a valid URL.
                  </p>
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
                  <div key={`link-${index}`}>
                    <div className="link-item">
                      <div className="form-group">
                        <label htmlFor={`link-name-input-${index}`}>Name</label>
                        <input
                          type="text"
                          id={`link-name-input-${index}`}
                          name="name"
                          placeholder="Name"
                          value={link.name}
                          maxLength="120"
                          onChange={this.handleLinkNameChange(index)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`link-url-input-${index}`}>URL</label>
                        <input
                          type="text"
                          id={`link-url-input-${index}`}
                          name="url"
                          placeholder="URL"
                          className={
                            !!link.urlError && !!link.url.length ? "error" : ""
                          }
                          value={link.url}
                          maxLength="240"
                          onChange={this.handleLinkUrlChange(index)}
                        />
                      </div>
                    </div>
                    {!link.name.length &&
                      !link.url.length && (
                        <p className="input-helper-text">
                          This link will be removed.
                        </p>
                      )}
                    {!link.name.length &&
                      !!link.url.length && (
                        <p className="input-error-text">
                          Please enter a name or the link will be removed.
                        </p>
                      )}
                    {!link.url.length &&
                      !!link.name.length && (
                        <p className="input-error-text">
                          Please enter a URL or the link will be removed.
                        </p>
                      )}
                    {!!link.urlError &&
                      !!link.name.length &&
                      !!link.url.length && (
                        <p className="url-input-error input-error-text">
                          Please enter a valid URL.
                        </p>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-link-list">
                Add links to your profiles and accounts on other websites or
                social media.
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
                (Example: Dad, Husband, Activist, Photographer, Producer, NYU
                alum, ENFP, Motorcyclist, Basketball player, Buddhist, Canadian)
              </div>
            )}
          </div>
          <div id="save">
            <button
              id="save-button"
              className="button primary-action"
              onClick={this.save}
              disabled={emailError || hasLinkUrlError}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    );
  }
}
