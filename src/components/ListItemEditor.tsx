import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IListItemEditorDataProps {
  readonly text: string;
  readonly index: number;
  readonly itemId: string;
}

interface IListItemEditorCallbackProps {
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
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
    onItemCancel: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemSave: PropTypes.func.isRequired,
  };

  constructor(props: IListItemEditorProps) {
    super(props);

    this.state = {
      textEditorValue: this.props.text,
    };
  }

  onCancel = (): void => {
    this.props.onItemCancel(this.props.itemId);
  };
  onDelete = (): void => {
    this.props.onItemDelete(this.props.itemId);
  };
  onSave = (): void => {
    this.props.onItemSave(this.props.itemId, this.state.textEditorValue);
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
