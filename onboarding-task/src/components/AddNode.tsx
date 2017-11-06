import * as React from 'react';
import * as PropTypes from 'prop-types';

import { isNullOrWhitespace } from '../utils/validation';
import { HotKeys } from 'react-hotkeys';

export interface IAddNodeCallbacksProps {
  onAdd: (text: string) => void;
}

interface IAddNodeState {
  text: string;
  isValid: boolean;
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
      isValid: true,
    };
  }

  _onAdd = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (!this.state.isValid) {
      event.preventDefault();
      this.props.onAdd(this.state.text);
      this.setState(() => ({text: ''}));
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
    return (
      <HotKeys handlers={{saveNode: this._onAdd}}>
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
            disabled={this.state.isValid}
          >
            Add
          </button>

        </form>
      </HotKeys>
    );
  }
}
