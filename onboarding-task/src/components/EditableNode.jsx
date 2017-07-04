import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isNullOrWhitespace } from '../utils/validation';

class EditableNode extends PureComponent {
  static displayName = 'EditableNode';

  static propTypes = {
    text: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  _save = () => this.props.onSave(this.state.text);

  _cancel = () => this.props.onCancel(this.props.text);

  _delete = () => this.props.onDelete();

  _onUpdateText = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  render() {
    return (
      <form className="form-inline">
        {this.props.index}.
        <input
          className="form-control"
          value={this.state.text}
          onChange={this._onUpdateText}
        />
        <button
          className="btn btn-primary"
          disabled={isNullOrWhitespace(this.state.text)}
          onClick={this._save}
          onSubmit={this._save}
        >Save
        </button>

        <button
          className="btn btn-default"
          onClick={this._cancel}
        >Cancel
        </button>

        <button
          className="btn btn-danger"
          onClick={this._delete}
        >Delete
        </button>

      </form>
    );
  }
}

export { EditableNode };
