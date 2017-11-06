const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { INodeViewModel } from '../models/NodeViewModel';

interface IViewNodeDataProps {
  nodeViewModel: INodeViewModel;
}

interface IViewNodeCallbackProps {
  onEdit: () => void;
}

type IViewNodeProps = IViewNodeDataProps & IViewNodeCallbackProps;

const viewNodePropTypes: React.ValidationMap<IViewNodeProps> = {
  nodeViewModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isPersisted: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export const ViewNode: React.StatelessComponent<IViewNodeProps> = ({onEdit, nodeViewModel}) =>
  <div onClick={onEdit}>{nodeViewModel.index}. {nodeViewModel.text}</div>;

ViewNode.displayName = 'ViewNode';
ViewNode.propTypes = viewNodePropTypes;
