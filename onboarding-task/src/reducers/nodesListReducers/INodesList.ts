import { INodesIds } from './nodesIdsReducer';
import { INodes } from './nodesReducer';
import { IErrorsMap } from './errorReducer';
import { IEditedNodes } from './editedNodesReducer';
import { IPersistedNodes } from './persistedNodesReducer';

export interface INodesList {
  nodes: INodes;
  editedNodes: IEditedNodes;
  persistedNodes: IPersistedNodes;
  nodesIds: INodesIds;
  isFetching: boolean;
  errors: IErrorsMap;
}
