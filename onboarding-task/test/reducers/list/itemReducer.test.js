import { itemReducer } from '../../../src/reducers/list/itemReducer.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import { ITEM_CHANGE_SAVED } from '../../../src/actions/actionTypes.ts';
import { saveChange } from '../../../src/actions/actionCreators.ts';

describe('Item reducer', () => {
  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('saves changed text correctly in ItemData', () => {
      const prevState = new ItemData({
        text: 'Mlock',
      });
      const expectedState = new ItemData({
        text: 'Glock',
      });
      const action = saveChange('42', 'Glock');

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknown' };

    it('returns default state on undefined', () => {
      const expectedState = new ItemData();

      const createdState = itemReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = new ItemData({
        text: 'Mlock',
      });

      const createdState = itemReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});
