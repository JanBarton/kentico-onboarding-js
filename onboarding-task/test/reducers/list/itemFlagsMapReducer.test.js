import { OrderedMap } from 'immutable';

import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer.ts';
import { ItemFlags } from '../../../src/models/ItemFlags.ts';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_MAKE_EDITABLE,
} from '../../../src/actions/actionTypes.ts';
import {
  cancelChange,
  createItemFactory,
  deleteItem,
  makeEditable,
  saveChange,
} from '../../../src/actions/actionCreators.ts';

describe('ItemFlags map reducer with', () => {
  const testFlagsMapState = new OrderedMap([
    [
      '0',
      new ItemFlags({
        isBeingEdited: true,
      }),
    ],
    [
      '1',
      new ItemFlags(),
    ],
  ]);
  const mockId = '123';
  const mockIdGenerator = () => mockId;

  describe(`"${ITEM_CREATED}" action`, () => {
    it('adds ItemFlags to map', () => {
      const prevState = testFlagsMapState;
      const expectedState = new OrderedMap([...prevState, [mockId, new ItemFlags()]]);
      const action = createItemFactory(mockIdGenerator)('Mlock');

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_DELETED}" action`, () => {
    it('does not change the state that does not contain given id', () => {
      const action = deleteItem('42');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('correctly removes item', () => {
      const action = deleteItem('0');
      const expectedState = new OrderedMap([
        [
          '1',
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('does not change the state that does not contain given id', () => {
      const action = saveChange('42', 'Glock');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('makes edited ItemFlags no longer editable', () => {
      const action = saveChange('0', 'Glock');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags(),
        ],
        [
          '1',
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_MAKE_EDITABLE}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = makeEditable('42');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('does nothing to ItemFlags that is already editable', () => {
      const action = makeEditable('0');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('makes ItemFlags editable correctly', () => {
      const action = makeEditable('1');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          '1',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_CANCELLED}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = cancelChange('42');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('does nothing to ItemFlags that is not editable', () => {
      const action = cancelChange('1');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('makes ItemFlags not-editable correctly', () => {
      const action = cancelChange('0');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags(),
        ],
        [
          '1',
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknownType' };

    it('returns default state on undefined', () => {
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });
  });
});
