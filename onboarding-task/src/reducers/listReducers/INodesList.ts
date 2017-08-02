import { INodesIds } from './nodesIdsReducer';
import { INodesInfo } from './nodesInfoReducer';
import { INodes } from './nodesReducer';

export interface INodesList {
  nodes: INodes;
  nodesInfo: INodesInfo;
  nodesIds: INodesIds;
}
