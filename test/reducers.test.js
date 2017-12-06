import { OrderedMap } from 'immutable';
import { ListItem } from '../src/models/ListItem';
import deepFreeze from 'deep-freeze';
import { reducers } from '../src/reducers';
import * as actions from '../src/actions/actionCreators';

describe('reducers', () => {
  it('will add ListItem model to state with specific text', () => {
    const initialState = { items: OrderedMap() };
    deepFreeze(initialState);

    const id = 'test';
    const text = 'text';
    const expectedState = {
      items: OrderedMap(
        {
          [id]: new ListItem({
            id,
            text,
          }),
        },
      ),
    };

    const actionParams = {
      itemId: id,
      text,
    };

    const addNewItemAction = actions.addNewItem(actionParams);
    const result = reducers(initialState, addNewItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will open ListItem for editing', () => {
    const id = 'test';
    const text = 'text';
    const initialState = {
      items: OrderedMap(
        {
          [id]: new ListItem({
            id,
            text,
          }),
        },
      ),
    };
    deepFreeze(initialState);

    const expectedState = {
      items: OrderedMap(
        {
          [id]: new ListItem({
            id,
            text,
            isBeingEdited: true,
          }),
        },
      ),
    };

    const actionParams = {
      itemId: id,
    };

    const selectItemTextAction = actions.openItemForEditing(actionParams);
    const result = reducers(initialState, selectItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item text to \'something else\'', () => {
    const expectedId = 'test';
    const expectedNewText = 'something else';
    const initialState = {
      items: OrderedMap(
        {
          [expectedId]: new ListItem({
            id: expectedId,
            text: 'something',
            isBeingEdited: true,
          }),
        },
      ),
    };
    deepFreeze(initialState);

    const expectedState = {
      items: OrderedMap(
        {
          [expectedId]: new ListItem({
            id: expectedId,
            text: expectedNewText,
            isBeingEdited: false,
          }),
        },
      ),
    };

    const actionParams = {
      itemId: expectedId,
      newText: expectedNewText,
    };

    const changeItemTextAction = actions.saveItemChanges(actionParams);
    const result = reducers(initialState, changeItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will cancel changes and put ListItem in { isBeingEdited: false } state', () => {
    const expectedId = 'test';
    const expectedText = 'whatever';
    const initialState = {
      items: OrderedMap(
        {
          [expectedId]: new ListItem({
            id: expectedId,
            text: expectedText,
            isBeingEdited: true,
          }),
        },
      ),
    };
    deepFreeze(initialState);

    const expectedState = {
      items: OrderedMap(
        {
          [expectedId]: new ListItem({
            id: expectedId,
            text: expectedText,
            isBeingEdited: false,
          }),
        },
      ),
    };

    const actionParams = {
      itemId: expectedId,
    };

    const cancelItemChangesAction = actions.cancelItemChanges(actionParams)
    const result = reducers(initialState, cancelItemChangesAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will delete from state', () => {
    const expectedId = 'test';
    const expectedText = 'also whatever';
    const initialState = {
      items: OrderedMap({
        [expectedId]: new ListItem({
          id: expectedId,
          text: 'whatever',
          isBeingEdited: true,
        }),
        'other-id': new ListItem({
          id: 'other-id',
          text: expectedText,
          isBeingEdited: false,
        }),
      }),
    };
    deepFreeze(initialState);

    const expectedState = {
      items: OrderedMap({
        'other-id': new ListItem({
          id: 'other-id',
          text: expectedText,
          isBeingEdited: false,
        }),
      }),
    };

    const actionParams = {
      itemId: expectedId,
    };

    const deleteItemAction = actions.deleteItem(actionParams);
    const result = reducers(initialState, deleteItemAction);

    expect(result)
      .toEqual(expectedState);
  });
});
