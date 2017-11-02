import { generateItems } from '../src/utils/generateItems';
import { OrderedMap } from 'immutable';
import { generateList } from '../src/utils/initItemList';
import * as Guid from 'guid';

describe('generate items', () => {
  it('returns ordered map', () => {
    const maybeOrderedMap = generateItems();

    expect(OrderedMap.isOrderedMap(maybeOrderedMap)).toBe(true);
  });

  it('returns ordered map with size of initItemList', () => {
    const orderedMap = generateItems();

    expect(orderedMap.size).toEqual(generateList().length);
  });

  it('returns ordered map with guid:key record:values', () => {
    const orderedMap = generateItems();

    orderedMap.keySeq().forEach((element) => {
      expect(Guid.isGuid(element)).toBe(true);
    });
    orderedMap.valueSeq().forEach((element) => {
      expect(typeof(element)).toEqual(typeof({}));
    });
  });
});
