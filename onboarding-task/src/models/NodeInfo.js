import { Record } from 'immutable';

const defaultNodeInfo = {
  isBeingEdited: false,
};

export const NodeInfo = Record(defaultNodeInfo, 'NodeInfo');
