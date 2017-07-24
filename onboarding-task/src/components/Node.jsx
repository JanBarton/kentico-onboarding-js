import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';

const Node = ({ nodeViewModel, onEdit, onSave, onCancel, onDelete }) => {
  return nodeViewModel.isBeingEdited ? (
    <EditableNode
      nodeViewModel={nodeViewModel}
      onCancel={onCancel}
      onSave={onSave}
      onDelete={onDelete}
    />
  ) : (
    <ViewNode
      nodeViewModel={nodeViewModel}
      onEdit={onEdit}
    />
  );
};

Node.displayName = 'Node';
Node.propTypes = {
  nodeViewModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { Node };
