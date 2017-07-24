import { NodeContent } from '../../src/models/NodeContent';
import { NodeInfo } from '../../src/models/NodeInfo';
import {
  createMemoizedNodeViewModel,
  NodeViewModel,
} from '../../src/models/NodeViewModel';
import { generateId } from '../../src/utils/generateId';

describe('NodeViewModel', () => {
  describe('createMemoizedNodeViewModel', () => {
    it('is really memoized', () => {
      const node = new NodeContent({
        id: generateId(),
        text: 'test text',
      });
      const nodeInfo = new NodeInfo();
      const createdNodeViewModel = createMemoizedNodeViewModel(node, nodeInfo, 0);

      const theSameNodeViewModel = createMemoizedNodeViewModel(node, nodeInfo, 0);

      expect(createdNodeViewModel).toBe(theSameNodeViewModel);
    });

    it('creates a correct viewModel', () => {
      const node = new NodeContent({
        id: generateId(),
        text: 'test text',
      });
      const nodeInfo = new NodeInfo({ isBeingEdited: true });
      const expectedViewModel = new NodeViewModel({
        id: node.id,
        text: 'test text',
        isBeingEdited: true,
        index: 1,
      });

      const actualViewModel = createMemoizedNodeViewModel(node, nodeInfo, 0);

      expect(expectedViewModel).toEqual(actualViewModel);
    });
  });
});
