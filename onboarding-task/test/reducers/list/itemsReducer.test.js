import { OrderedMap } from 'immutable';

import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer.ts';
import { itemsReducer } from '../../../src/reducers/list/itemsReducer.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import {
  DELETE_REQUEST_SUCCESS,
  CREATE_REQUEST_STARTED,
  CREATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_STARTED,
} from '../../../src/actions/actionTypes.ts';
import {
  deleteItemSucceeded,
  createItemSucceeded,
  createItemStarted,
  updateItemStarted,
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

  describe(`"${CREATE_REQUEST_STARTED}" action`, () => {
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
      const action = createItemStarted(mockId, 'Block');

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${CREATE_REQUEST_SUCCESS}" action`, () => {
    it('removes optimistic item and replaces it with a new one', () => {
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
          '2',
          new ItemData({
            id: '2',
            text: 'Glock',
          }),
        ],
      ]);
      const jsonResponseItem = {
        id: '2',
        text: 'Glock',
      };
      const action = createItemSucceeded('1', jsonResponseItem);

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${DELETE_REQUEST_SUCCESS}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = deleteItemSucceeded('42');
      const prevState = testItemsMapState;

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });

    it('correctly removes item', () => {
      const action = deleteItemSucceeded('0');
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

  describe(`"${UPDATE_REQUEST_STARTED}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const putItem = new ItemData({
        id: '41',
        text: 'Glock',
      });
      const action = updateItemStarted(putItem);

      const createdState = itemsReducer(testItemsMapState, action);

      expect(createdState).toBe(testItemsMapState);
    });

    it('correctly changes ItemData', () => {
      const putItem = new ItemData({
        id: '1',
        text: 'Flock',
      });
      const action = updateItemStarted(putItem);
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
