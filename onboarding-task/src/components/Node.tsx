const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';
import { INodeViewModel } from '../models/NodeViewModel';

export interface INodeDataProps {
  nodeViewModel: INodeViewModel;
}

export interface INodeCallbacksProps {
  onEdit: () => void;
  onSave: (text: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

type INodeProps = INodeDataProps & INodeCallbacksProps;

const nodePropTypes: React.ValidationMap<INodeProps> = {
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

export const Node: React.StatelessComponent<INodeProps> = props =>
  props.nodeViewModel.isBeingEdited ? (
    <EditableNode
      nodeViewModel={props.nodeViewModel}
      onCancel={props.onCancel}
      onSave={props.onSave}
      onDelete={props.onDelete}
    />
  ) : (
    <ViewNode
      nodeViewModel={props.nodeViewModel}
      onEdit={props.onEdit}
    />
  );


Node.displayName = 'Node';
Node.propTypes = nodePropTypes;
