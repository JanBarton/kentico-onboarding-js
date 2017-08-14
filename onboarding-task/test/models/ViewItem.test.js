import { ViewItem } from '../../src/models/ViewItem.ts';
import { ItemData } from '../../src/models/ItemData.ts';
import { ItemFlags } from '../../src/models/ItemFlags.ts';

describe('View item memoization tests', () => {
  const testItemData = new ItemData({ id: '0', text: 'Mlock' });
  const testItemFlags = new ItemFlags({ isBeingEdited: true });

  it('creates correct ViewItem object', () => {
    const expectedViewItem = {
      id: '0',
      index: 1,
      text: 'Mlock',
      isBeingEdited: true,
    };

    const createdViewItem = new ViewItem(1, testItemData, testItemFlags);

    expect(createdViewItem).toEqual(expectedViewItem);
  });

  it('multiple calls with same parameters return same reference', () => {
    const firstViewItem = new ViewItem(1, testItemData, testItemFlags);
    const secondViewItem = new ViewItem(1, testItemData, testItemFlags);

    expect(firstViewItem).toBe(secondViewItem);
  });
});
