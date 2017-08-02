import * as React from 'react';
import * as PropTypes from 'prop-types';

import { isNullOrWhitespace } from '../utils/validation';
import { HotKeys } from 'react-hotkeys';
import { KeyHandler } from '../@types/IKeyMap';

export interface IAddNodeCallbacksProps {
  onAdd: (text: string) => void;
}

interface IAddNodeState {
  text: string;
  keyHandlers: KeyHandler;
}

export class AddNode extends React.PureComponent<IAddNodeCallbacksProps, IAddNodeState> {
  static displayName = 'AddNode';

  static propTypes: React.ValidationMap<IAddNodeCallbacksProps> = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props: IAddNodeCallbacksProps) {
    super(props);
    this.state = {
      text: '',
      keyHandlers: {
        saveNode: this._onAdd,
      }
    };
  }

  _onAdd = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (!isNullOrWhitespace(this.state.text)) {
      event.preventDefault();
      this.props.onAdd(this.state.text);
      this.setState(() => ({text: ''}));
    }
  };

  _updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    this.setState(() => ({text}));
  };

  render() {
    return (
      <HotKeys handlers={this.state.keyHandlers}>
        <form className="form-inline" onSubmit={this._onAdd}>

          <input
            autoFocus
            className="form-control"
            value={this.state.text}
            onChange={this._updateText}
          />

          <button
            autoFocus
            type="submit"
            className="btn btn-default"
            disabled={isNullOrWhitespace(this.state.text)}
          >
            Add
          </button>

        </form>
      </HotKeys>
    );
  }
}
