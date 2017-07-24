import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { isNullOrWhitespace } from '../utils/validation';

class EditableNode extends PureComponent {
  static displayName = 'EditableNode';

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    nodeViewModel: ImmutablePropTypes.recordOf({
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.nodeViewModel.text,
    };
  }

  _saveNode = event => {
    event.preventDefault();
    this.props.onSave(this.state.text);
  };

  _updateText = event => {
    const text = event.target.value;
    this.setState(() => ({ text }));
  };

  render() {
    const { text } = this.state;

    return (
      <form className="form-inline" onSubmit={this._saveNode}>
        {this.props.nodeViewModel.index}.

        <input
          autoFocus
          className="form-control"
          value={text}
          onChange={this._updateText}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isNullOrWhitespace(text)}
        >
          Save
        </button>

        <button
          type="button"
          className="btn btn-default"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>

      </form>
    );
  }
}

export { EditableNode };
