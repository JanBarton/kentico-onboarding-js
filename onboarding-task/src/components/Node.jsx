import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';

class Node extends PureComponent {
  static displayName = 'Node';

  static propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
    };
  }

  _onSave = (text) => {
    this.props.onSave(this.props.id, text);
    this._toggleNodeEditable();
  };

  _toggleNodeEditable = () => {
    this.setState(state => ({
      isBeingEdited: !state.isBeingEdited,
    }));
  };

  _onDelete = () => this.props.onDelete(this.props.id);

  render() {
    return this.state.isBeingEdited === true ? (
      <EditableNode
        text={this.props.text}
        index={this.props.index}
        onSave={this._onSave}
        onCancel={this._toggleNodeEditable}
        onDelete={this._onDelete}
      />
    ) : (
      <ViewNode
        text={this.props.text}
        index={this.props.index}
        onEdit={this._toggleNodeEditable}
      />
    );
  }
}

export { Node };
