import { nodesReducer } from './nodesReducer';
import { nodesIdsReducer } from './nodesIdsReducer';
import { INodesList } from './INodesList';
import { IAction } from '../../@types/IAction';
import { isFetchingReducer } from './isFetchingReducer';
import { errorReducer } from './errorReducer';
import { editedNodesReducer } from './editedNodesReducer';
import { persistedNodesReducer } from './persistedNodesReducer';

export const nodesListReducer = (state: INodesList = {} as INodesList, action: IAction): INodesList => ({
  nodes: nodesReducer(state.nodes, action),
  editedNodes: editedNodesReducer(state.editedNodes, action),
  persistedNodes: persistedNodesReducer(state.persistedNodes, action),
  nodesIds: nodesIdsReducer(state.nodesIds, action),
  isFetching: isFetchingReducer(state.isFetching, action),
  errors: errorReducer(state.errors, action)
});
