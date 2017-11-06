import { TypedRecord } from './TypedRecord';

export interface INodeContent {
  readonly id: Guid;
  readonly text: string;
}

const defaultNodeContent: INodeContent = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

class NodeContent extends TypedRecord<NodeContent, INodeContent>(defaultNodeContent) implements INodeContent {
  readonly id: Guid;
  readonly text: string;
}

export { NodeContent };
