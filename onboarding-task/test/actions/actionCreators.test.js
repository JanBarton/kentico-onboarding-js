import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_MAKE_EDITABLE,
} from '../../src/actions/actionTypes.ts';
import {
  cancelChange,
  createItemFactory,
  deleteItem,
  makeEditable,
  saveChange,
} from '../../src/actions/actionCreators.ts';

describe('Action creators', () => {
  const mockId = '123';
  const mockIdGenerator = () => mockId;

  it(`create "${ITEM_CREATED}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_CREATED,
      payload: {
        text: 'New Item',
        newId: mockId,
      },
    };

    const createdAction = createItemFactory(mockIdGenerator)('New Item');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`create "${ITEM_DELETED}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_DELETED,
      payload: {
        id: '17',
      },
    };

    const createdAction = deleteItem('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${ITEM_CHANGE_CANCELLED}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_CHANGE_CANCELLED,
      payload: {
        id: '17',
      },
    };

    const createdAction = cancelChange('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${ITEM_CHANGE_SAVED}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_CHANGE_SAVED,
      payload: {
        id: '17',
        text: 'Edited Text',
      },
    };

    const createdAction = saveChange('17', 'Edited Text');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${ITEM_MAKE_EDITABLE}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_MAKE_EDITABLE,
      payload: {
        id: '17',
      },
    };

    const createdAction = makeEditable('17');

    expect(createdAction).toEqual(expectedAction);
  });
});
