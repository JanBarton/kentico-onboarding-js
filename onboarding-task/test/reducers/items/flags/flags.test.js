import { Map } from 'immutable';
import { flags } from '../../../../src/reducers/items/flags/flags';
import { deleteItem, toggleBeingEdited } from '../../../../src/actions/publicActions';
import { createItemBuilder } from '../../../../src/actions/actionCreators';
import { ListItemFlags } from '../../../../src/models/ListItemFlags';
import { ListItemData } from '../../../../src/models/ListItemData';

describe('Flags reducer', () => {
  const id1 = 'e9082417-eae0-4b00-a2d0-5722ba3b1641';
  const id2 = '946ca2ad-a77f-4f8b-8b58-7e40de6f7ba5';
  const initialState = new Map([
    [id1, new ListItemFlags()],
    [id2, new ListItemFlags()],
  ]);

  it('returns new state on create properly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags()],
      ['xxyyzz', new ListItemFlags()],
    ]);
    const dummyFactory = () => new ListItemData({ id: 'xxyyzz' });
    const dummyCreateItem = createItemBuilder(dummyFactory);

    const result = flags(initialState, dummyCreateItem(''));

    expect(result).toEqual(expectedResult);
  });

  it('toggles flags correctly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags({
        isBeingEdited: true,
      })],
    ]);

    const result = flags(initialState, toggleBeingEdited(id2));

    expect(result).toEqual(expectedResult);
    expect(result).not.toBe(expectedResult);
  });

  it('returns new state on delete correctly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
    ]);
    const result = flags(initialState, deleteItem(id2));

    expect(result).toEqual(expectedResult);
  });

  it('returns default state on wrong input', () => {
    const test = flags(undefined, {});

    expect(test).toEqual(new Map());
  });
});