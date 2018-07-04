import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItem } from '../reducers/IStore';

export interface IListItemEditorDataProps {
  readonly item: IItem;
}

export interface IListItemEditorCallbackProps {
  readonly onItemCancel: (itemId: string) => void;
  readonly onItemDelete: (itemId: string) => void;
  readonly onItemSave: (itemId: string, textEditorValue: string) => void;
}

interface IListItemEditorProps extends IListItemEditorDataProps, IListItemEditorCallbackProps {
}

interface ListItemEditorState {
  textEditorValue: string;
}

export class ListItemEditor extends React.PureComponent<IListItemEditorProps, ListItemEditorState> {
  static displayName = 'ListItemEditor';
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemCancel: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemSave: PropTypes.func.isRequired,
  };

  constructor(props: IListItemEditorProps) {
    super(props);

    this.state = {
      textEditorValue: this.props.item.text,
    };
  }

  onCancel = (): void => {
    this.props.onItemCancel(this.props.item.id);
  };
  onDelete = (): void => {
    this.props.onItemDelete(this.props.item.id);
  };
  onSave = (): void => {
    this.props.onItemSave(this.props.item.id, this.state.textEditorValue);
  };
  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const targetValue = event.target.value;
    this.setState(() => ({textEditorValue: targetValue}));
  };

  render() {
    return (
      <React.Fragment>
        <input value={this.state.textEditorValue} onChange={this.onChange} type="text" />
        <button onClick={this.onSave} className="btn btn-primary">Save</button>
        <button onClick={this.onCancel} className="btn btn-light">Cancel</button>
        <button onClick={this.onDelete} className="btn btn-danger">Delete</button>
      </React.Fragment>
    );
  }
}
