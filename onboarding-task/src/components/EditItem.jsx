import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditItem extends Component {

  static displayName = 'EditItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.string,
      isEdited: PropTypes.bool,
    }),
    removeElement: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.element.text,
    };
  }

  _handleChange = event => {
    this.setState({ text: event.target.value });
  };

  _handleCancelClick = () => {
    this.props.saveChange(this.props.element.id, { isEdited: false });
  };

  _handleSaveClick = () => {
    this.props.saveChange(this.props.element.id, { text: this.state.text, isEdited: false });
  };

  _handleRemoveClick = () => {
    this.props.removeElement(this.props.element.id);
  };

  render() {
    return (
      <div className="form-inline">
        <span>{this.props.index}. </span>
        <input
          className="form-control"
          type="text"
          value={this.state.text}
          onChange={this._handleChange}
        />
        <button
          className="btn btn-primary form-control"
          onClick={this._handleSaveClick}
        >
          Save
        </button>
        <button
          className="btn btn-default form-control"
          onClick={this._handleCancelClick}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger form-control"
          onClick={this._handleRemoveClick}
        >
          Delete
        </button>
      </div>
    );
  }
}

export { EditItem };
