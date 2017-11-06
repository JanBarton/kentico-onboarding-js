import { INodeContent } from '../models/NodeContent';

export interface IServerNode {
  readonly id: Guid;
  readonly text: string;
  readonly creation: Date;
  readonly lastUpdate: Date;
}

export const parseFetchedNode = (node: IServerNode): INodeContent => ({id: node.id, text: node.text});

export const parseFetchedNodes = (nodes: Array<IServerNode>): Array<INodeContent> => nodes.map(parseFetchedNode);
