import memoize from 'memoizee';
import { Record } from 'immutable';

const NodeViewModel = Record({
  id: '00000000000000000000000000000000',
  text: '',
  isBeingEdited: false,
  index: 0,
}, 'NodeViewModel');

const createNodeViewModel = (nodeContent, nodeInfo, index) => {
  return new NodeViewModel({
    ...nodeContent.toObject(),
    ...nodeInfo.toObject(),
    index: index + 1,
  });
};

const createMemoizedNodeViewModel = memoize(createNodeViewModel);

export {
  createMemoizedNodeViewModel,
  createNodeViewModel,
};

