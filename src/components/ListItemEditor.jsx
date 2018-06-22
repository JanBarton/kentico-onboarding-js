import React, { PropTypes } from 'react';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';
  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    itemId: PropTypes.number.isRequired,
    onItemCancel: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      textEditorValue: this.props.text,
    };
  }

  onCancel = () => {
    this.props.onItemCancel(this.props.itemId);
  };
  onDelete = () => {
    this.props.onItemDelete(this.props.itemId);
  };
  onSave = () => {
    this.props.onItemSave(this.props.itemId, this.state.textEditorValue);
  };
  onChange = (event) => {
    const targetValue = event.target.value;
    this.setState({ textEditorValue: targetValue });
  };

  render() {
    return (
      <div>
        <input value={this.state.textEditorValue} onChange={this.onChange} type="text" />
        <button onClick={this.onSave} className="btn btn-primary">Save</button>
        <button onClick={this.onCancel} className="btn btn-light">Cancel</button>
        <button onClick={this.onDelete} className="btn btn-danger">Delete</button>
      </div>
    );
  }
}
