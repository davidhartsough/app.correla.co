import React from "react";

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      url: props.url
    };
  }

  handleInputChange = ({ target }) => {
    const { updateLink, index } = this.props;
    const { name, value } = target;
    this.setState(
      {
        [name]: value
      },
      () => {
        updateLink(index, this.state);
      }
    );
  };

  render() {
    const { index, isEditing } = this.props;
    const { name, url } = this.state;
    return (
      <div className="link-item">
        <div className="account-form-group">
          <label htmlFor={`link-name-input-${index}`}>Name</label>
          <input
            type="text"
            id={`link-name-input-${index}`}
            name="name"
            placeholder="Name"
            value={name}
            maxLength="120"
            onChange={this.handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="account-form-group">
          <label htmlFor={`link-url-input-${index}`}>URL</label>
          <input
            type="text"
            id={`link-url-input-${index}`}
            name="url"
            placeholder="URL"
            value={url}
            onChange={this.handleInputChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
    );
  }
}
