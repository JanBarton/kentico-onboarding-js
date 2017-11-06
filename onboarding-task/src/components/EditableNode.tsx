const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { isNullOrWhitespace } from '../utils/validation';
import { INodeViewModel } from '../models/NodeViewModel';

interface IEditableNodeDataProps {
  nodeViewModel: INodeViewModel;
}

interface IEditableNodeCallbacksProps {
  onSave: (text: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

type IEditableNodeProps = IEditableNodeDataProps & IEditableNodeCallbacksProps;

interface IEditableNodeState {
  text: string;
  isValid: boolean;
}

export class EditableNode extends React.PureComponent<IEditableNodeProps, IEditableNodeState> {
  static displayName = 'EditableNode';

  static propTypes: React.ValidationMap<IEditableNodeProps> = {
    nodeViewModel: ImmutablePropTypes.recordOf({
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props: IEditableNodeProps) {
    super(props);

    this.state = {
      text: props.nodeViewModel.text,
      isValid: false,
    };
  }

  _saveNode = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!this.state.isValid) {
      this.props.onSave(this.state.text);
    }
  };

  _updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    this.setState(() => ({
      text,
      isValid: isNullOrWhitespace(text)
    }));
  };

  render() {
    const {text} = this.state;
    const { nodeViewModel, onCancel, onDelete } = this.props;

    return (
      <HotKeys handlers={{
        cancelNode: onCancel,
        saveNode: this._saveNode,
        deleteNode: onDelete,
      }}>
        <form className="form-inline" onSubmit={this._saveNode}>
          {nodeViewModel.index}.

          <input
            autoFocus
            className="form-control"
            value={text}
            onChange={this._updateText}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.isValid}
          >
            Save
          </button>

          <button
            type="button"
            className="btn btn-default"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>

        </form>
      </HotKeys>
    );
  }
}
