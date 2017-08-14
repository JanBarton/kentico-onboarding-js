import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { FormEvent } from 'react';
import { KeyboardEvent } from 'react';

import { isItemTextValid } from '../utils/validation';
import { IViewItem } from '../models/ViewItem';

export interface IEditItemDataProps {
  item: IViewItem;
}

export interface IEditItemCallbackProps {
  onDelete: () => void;
  onSave: (text: string) => void;
  onCancel: () => void;
}

interface IEditItemState {
  text: string;
}

class EditItem extends React.PureComponent<IEditItemDataProps & IEditItemCallbackProps, IEditItemState> {
  static displayName = 'EditItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,

    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props: IEditItemDataProps & IEditItemCallbackProps) {
    super(props);

    this.state = {
      text: props.item.text,
    };
  }

  _textChange = (event: FormEvent<HTMLInputElement>) => {
    const setStateText = (text: string) => (() => ({text}));
    this.setState(setStateText(event.currentTarget.value));
  };

  _saveChange = () => {
    const editedText = this.state.text;

    if (isItemTextValid(editedText)) {
      this.props.onSave(editedText);
    }
  };

  _keyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        this._saveChange();
        break;

      case 'Escape':
        this.props.onCancel();
        break;

      default:
        break;
    }
  };

  render() {
    const editedText = this.state.text;

    return (
      <div className="form-inline">
        <span>{this.props.item.index}. </span>
        <input
          autoFocus
          className="form-control"
          type="text"
          value={editedText}
          onChange={this._textChange}
          onKeyUp={this._keyUp}
        />
        <button
          className={classNames('btn', 'btn-primary', 'form-control', {disabled: !isItemTextValid(editedText)})}
          onClick={this._saveChange}
        >
          Save
        </button>
        <button
          className="btn btn-default form-control"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger form-control"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export { EditItem };
