import memoize from 'memoizee';
import { Record } from 'immutable';

const NodeViewModel = Record({
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isBeingEdited: false,
  index: 0,
}, 'NodeViewModel');

const createNodeViewModel = (nodeContent, nodeInfo, index) => new NodeViewModel({
  ...nodeContent.toObject(),
  ...nodeInfo.toObject(),
  index: index + 1,
});

const createMemoizedNodeViewModel = memoize(createNodeViewModel);

export {
  NodeViewModel,
  createMemoizedNodeViewModel,
};

