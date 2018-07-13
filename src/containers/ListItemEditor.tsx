import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IListItemEditorCallbackProps, IListItemEditorDataProps, ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import { onClickItemCancel, onClickItemDelete, onClickItemSave } from '../actions/actions';
import { IItem, IStore } from '../reducers/IStore';

interface IOwnProps {
  readonly item: IItem;
}

function mapStateToProps(_state: IStore, ownProps: IOwnProps): IListItemEditorDataProps {
  return {
    ...ownProps
  };
}

function mapDispatchToProps(dispatch: Dispatch): IListItemEditorCallbackProps {
  return {
    onItemCancel: (itemId: string) => dispatch(onClickItemCancel(itemId)),
    onItemSave: (itemId: string, text: string) => dispatch(onClickItemSave(itemId, text)),
    onItemDelete: (itemId: string) => dispatch(onClickItemDelete(itemId)),
  };
}

export const ListItemEditor: React.ComponentClass<IOwnProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemEditorComponent);
