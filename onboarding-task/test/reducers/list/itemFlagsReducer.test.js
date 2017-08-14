import { itemFlagsReducer } from '../../../src/reducers/list/itemFlagsReducer.ts';
import { ItemFlags } from '../../../src/models/ItemFlags.ts';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_MAKE_EDITABLE,
} from '../../../src/actions/actionTypes.ts';
import {
  cancelChange,
  makeEditable,
  saveChange,
} from '../../../src/actions/actionCreators.ts';

describe('ItemFlags reducer with', () => {
  describe(`"${ITEM_MAKE_EDITABLE}" action`, () => {
    it('makes ItemFlags edited correctly', () => {
      const prevState = new ItemFlags();
      const expectedState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change already edited ItemFlags', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });

  describe(`"${ITEM_CHANGE_CANCELLED}" action`, () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });

    it('makes edited ItemFlags not editable anymore', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });

    it('makes edited ItemFlags not editable anymore', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknownType' };

    it('returns default state on undefined', () => {
      const expectedState = new ItemFlags();

      const createdState = itemFlagsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});
