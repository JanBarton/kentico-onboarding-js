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

const viewNodePropTypes = {
  nodeViewModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export const ViewNode: React.StatelessComponent<IViewNodeDataProps & IViewNodeCallbackProps> = ({onEdit, nodeViewModel}) =>
  <div onClick={onEdit}>{nodeViewModel.index}. {nodeViewModel.text}</div>;

ViewNode.displayName = 'ViewNode';
ViewNode.propTypes = viewNodePropTypes;

