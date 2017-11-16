import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { textIsEmpty, NEW_ITEM_TEXT_PLACEHOLDER } from '../utils/validation';

class ListItemEditMode extends PureComponent {
  constructor(props) {
    super(props);

    const { text } = this.props;

    this.state = {
      text,
    };
  }

  onInputChange = (e) => this.setState({ text: e.target.value });

  onSave = () => {
    const { text } = this.state;
    this.props.onSave(text);
  };

  render() {
    const { text } = this.state;
    const { number } = this.props;
    const enableSaveButton = !textIsEmpty(text);

    return (
      <div className="form-inline">
        <label className="col-form-label">
          {number}{'. '}
        </label>

        <input
          className="form-control col-md-5"
          type="text"
          value={text}
          placeholder={NEW_ITEM_TEXT_PLACEHOLDER}
          onChange={this.onInputChange}
        />

        <button
          className="btn btn-primary"
          onClick={this.onSave}
          disabled={!enableSaveButton}
        >
          Save
        </button>

        <button
          className="btn btn-secondary"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

ListItemEditMode.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ListItemEditMode };
