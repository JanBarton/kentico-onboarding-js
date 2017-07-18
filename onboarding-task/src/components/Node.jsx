import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';

class Node extends PureComponent {
  static displayName = 'Node';

  static propTypes = {
    nodeModel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  _onSave = text => this.props.onSave(this.props.nodeModel.id, text);

  _toggleNodeEditable = () => this.props.onToggle(this.props.nodeModel.id);

  _onDelete = () => this.props.onDelete(this.props.nodeModel.id);

  render() {
    return this.props.nodeModel.isBeingEdited ? (
      <EditableNode
        nodeModel={this.props.nodeModel}
        onSave={this._onSave}
        onCancel={this._toggleNodeEditable}
        onDelete={this._onDelete}
      />
    ) : (
      <ViewNode
        nodeModel={this.props.nodeModel}
        onEdit={this._toggleNodeEditable}
      />
    );
  }
}

export { Node };
