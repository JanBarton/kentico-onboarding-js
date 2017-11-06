import { NodeContent } from '../../src/models/NodeContent.ts';
import {
  createMemoizedNodeViewModel,
  NodeViewModel,
} from '../../src/models/NodeViewModel.ts';
import { generateId } from '../../src/utils/generateId.ts';

describe('NodeViewModel', () => {
  describe('createMemoizedNodeViewModel', () => {
    it('is really memoized', () => {
      const node = new NodeContent({
        id: generateId(),
        text: 'test text',
      });
      const createdNodeViewModel = createMemoizedNodeViewModel(node, false, false, 0);

      const theSameNodeViewModel = createMemoizedNodeViewModel(node, false, false, 0);

      expect(createdNodeViewModel).toBe(theSameNodeViewModel);
    });

    it('creates a correct viewModel', () => {
      const node = new NodeContent({
        id: generateId(),
        text: 'test text',
      });
      const expectedViewModel = new NodeViewModel({
        id: node.id,
        text: 'test text',
        isBeingEdited: true,
        isPersisted: true,
        index: 1,
      });

      const actualViewModel = createMemoizedNodeViewModel(node, true, true, 0);

      expect(expectedViewModel).toEqual(actualViewModel);
    });
  });
});
