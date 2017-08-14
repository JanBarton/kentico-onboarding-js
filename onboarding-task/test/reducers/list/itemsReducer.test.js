import { OrderedMap } from 'immutable';

import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer.ts';
import { itemsReducer } from '../../../src/reducers/list/itemsReducer.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import {
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
} from '../../../src/actions/actionTypes.ts';
import {
  createItemFactory,
  deleteItem,
  saveChange,
} from '../../../src/actions/actionCreators.ts';

describe('Items map reducer with', () => {
  const testItemsMapState = new OrderedMap([
    [
      '0',
      new ItemData({
        id: '0',
        text: 'Mlock',
      }),
    ],
    [
      '1',
      new ItemData({
        id: '1',
        text: 'Glock',
      }),
    ],
  ]);
  const mockId = '123';
  const mockIdGenerator = () => mockId;

  describe(`"${ITEM_CREATED}" action`, () => {
    it('adds item to map', () => {
      const prevState = testItemsMapState;
      const expectedState = new OrderedMap([
        ...prevState,
        [
          mockId,
          new ItemData({
            id: mockId,
            text: 'Block',
          }),
        ],
      ]);
      const action = createItemFactory(mockIdGenerator)('Block');

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_DELETED}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = deleteItem('42');
      const prevState = testItemsMapState;

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });

    it('correctly removes item', () => {
      const action = deleteItem('0');
      const prevState = testItemsMapState;
      const expectedState = new OrderedMap([
        [
          '1',
          new ItemData({
            id: '1',
            text: 'Glock',
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = saveChange('42', 'Glock');

      const createdState = itemsReducer(testItemsMapState, action);

      expect(createdState).toBe(testItemsMapState);
    });

    it('correctly changes ItemData', () => {
      const action = saveChange('1', 'Flock');
      const prevState = testItemsMapState;
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemData({
            id: '0',
            text: 'Mlock',
          }),
        ],
        [
          '1',
          new ItemData({
            id: '1',
            text: 'Flock',
          }),
        ],
      ]);

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknown' };

    it('returns default state on undefined', () => {
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const createdState = itemsReducer(testItemsMapState, action);

      expect(createdState).toBe(testItemsMapState);
    });
  });
});
