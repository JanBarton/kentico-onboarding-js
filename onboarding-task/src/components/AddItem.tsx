import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { FormEvent } from 'react';

import { isItemTextValid } from '../utils/validation';

export interface IAddItemCallbackProps {
  onAddItem: (text: string) => void;
}

interface IAddItemState {
  currentText: string;
}

export class AddItem extends React.PureComponent<IAddItemCallbackProps, IAddItemState> {

  static displayName = 'AddItem';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props: IAddItemCallbackProps) {
    super(props);
    this.state = {
      currentText: '',
    };
  }

  _onChange = (event: FormEvent<HTMLInputElement>): void => {
    const currentText = event.currentTarget.value;
    this.setState(() => ({ currentText }));
  };

  _addItem = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const currText = this.state.currentText;

    if (isItemTextValid(currText)) {
      this.props.onAddItem(currText);
      this.setState(() => ({currentText: ''}));
    }
  };

  render() {
    return (
      <form onSubmit={this._addItem} className="form-inline list-group-item row">
        <input
          type="text"
          className="form-control"
          onChange={this._onChange}
          value={this.state.currentText}
        />
        <button
          type="submit"
          className={classNames('form-control', 'btn', 'btn-default', {disabled: !isItemTextValid(this.state.currentText)})}
        >
          Add
        </button>
      </form>
    );
  }
}
