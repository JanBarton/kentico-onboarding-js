import { OrderedMap } from 'immutable';

import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer.ts';
import { ItemFlags } from '../../../src/models/ItemFlags.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS,
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  CREATE_REQUEST_FAIL,
  CREATE_REQUEST_STARTED,
  CREATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_STARTED,
  UPDATE_REQUEST_SUCCESS,
} from '../../../src/actions/actionTypes.ts';
import {
  createItemSucceeded,
  createItemStarted,
  deleteItemSucceeded,
  makeEditable,
  cancelChange,
  deleteItemStarted,
  updateItemStarted,
  updateItemSucceeded,
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

  describe(`"${DELETE_REQUEST_SUCCESS}" action`, () => {
    it('does not change the state that does not contain given id', () => {
      const action = deleteItemSucceeded('42');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('correctly removes item', () => {
      const action = deleteItemSucceeded('0');
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

  describe(`"${CREATE_REQUEST_SUCCESS}" action`, () => {
    it('replaces optimistic ItemFlags with returned one', () => {
      const prevState = testFlagsMapState;
      const formerId = '1';
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          mockId,
          new ItemFlags({ isStored: true }),
        ],
      ]);
      const action = createItemSucceeded(formerId, {
        id: mockId,
        text: 'mlock',
      });

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${CREATE_REQUEST_STARTED}" action`, () => {
    it('adds new ItemFlags with optimistic id to state', () => {
      const expectedState = new OrderedMap([
        ...testFlagsMapState,
        [
          mockId,
          new ItemFlags({ isStored: false }),
        ],
      ]);

      const action = createItemStarted(
        mockId, 'mlock'
      );

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  // ---

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

  describe(`"${DELETE_REQUEST_STARTED}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = deleteItemStarted('42');

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });

    it('sets corresponding flags', () => {
      const action = deleteItemStarted('1');
      const expectedState = new OrderedMap([
        ...testFlagsMapState,
        [
          '1',
          new ItemFlags({
            isBeingEdited: false,
            isStored: false,
            requestError: null,
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${UPDATE_REQUEST_STARTED}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = updateItemStarted(new ItemData({ id: '42' }));

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(testFlagsMapState);
    });


    it('sets corresponding flags', () => {
      const action = updateItemStarted(new ItemData({ id: '1' }));
      const expectedState = new OrderedMap([
        ...testFlagsMapState,
        [
          '1',
          new ItemFlags({
            isBeingEdited: false,
            isStored: false,
            requestError: null,
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${UPDATE_REQUEST_SUCCESS}" action`, () => {
    it('does nothing to state not containing given id', () => {
      const action = updateItemSucceeded('42');

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

  describe(`"${UPDATE_REQUEST_FAIL}" action`, () => {
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

  describe(`"${DELETE_REQUEST_FAIL}" action`, () => {
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

  describe(`"${CREATE_REQUEST_FAIL}" action`, () => {
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
})
;
