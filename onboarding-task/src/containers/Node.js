import { connect } from 'react-redux';

import { Node as NodeComponent } from '../components/Node';
import { createMemoizedNodeViewModel } from '../models/NodeViewModel.js';
import * as actions from '../actions/actionCreators';

const mapStateToProps = ({ nodesList: { nodes, nodesInfo } }, { id, index }) => ({
  nodeViewModel: createMemoizedNodeViewModel(nodes.get(id), nodesInfo.get(id), index),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onEdit: () => dispatch(actions.toggleNode(id)),
  onSave: text => dispatch(actions.saveNode(id, text)),
  onCancel: () => dispatch(actions.toggleNode(id)),
  onDelete: () => dispatch(actions.deleteNode(id)),
});

export const Node = connect(mapStateToProps, mapDispatchToProps)(NodeComponent);
