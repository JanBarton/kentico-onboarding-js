import { TypedRecord } from './TypedRecord';

interface INodeInfo {
  readonly isBeingEdited: boolean;
}

const defaultNodeInfo: INodeInfo = {
  isBeingEdited: false,
};

class NodeInfo extends TypedRecord<NodeInfo, INodeInfo>(defaultNodeInfo) implements INodeInfo {
  readonly isBeingEdited: boolean;
}

export { NodeInfo };
