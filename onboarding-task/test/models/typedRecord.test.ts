import { ItemData } from '../../src/models/ItemData';

describe('TypedRecord<ItemData>', () => {
  it('merges correctly ItemData object', () => {
    const originalItemData = new ItemData({
      id: '1',
      text: 'Makovy zavin',
    });
    const dataToMerge = new ItemData({ text: 'Tvarohovy zavin' });
    const expectedItemData = new ItemData({
      id: '00000000-0000-0000-0000-000000000000',
      text: 'Tvarohovy zavin',
    });

    const resultingItemData = originalItemData.typedMerge(dataToMerge);

    expect(resultingItemData).toEqual(expectedItemData);
  });

  it('merges correctly partial object literal', () => {
    const originalItemData = new ItemData({
      id: '1',
      text: 'Makovy zavin',
    });
    const expectedItemData = new ItemData({
      id: '1',
      text: 'Orechovy zavin',
    });

    const resultingItemData = originalItemData.typedMerge({
      text: 'Orechovy zavin',
    });

    expect(resultingItemData).toEqual(expectedItemData);
  });

  it('ignores empty object literal', () => {
    const originalItemData = new ItemData({
      id: '1',
      text: 'Makovy zavin',
    });

    const resultingItemData = originalItemData.typedMerge({});

    expect(resultingItemData).toBe(originalItemData);
  });
});
