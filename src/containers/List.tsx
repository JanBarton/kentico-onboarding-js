import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Immutable from 'immutable';
import * as memoizee from 'memoizee';
import { IItem, IStore, OrderBy } from '../reducers/IStore';
import { IListCallbackProps, IListDataProps, List as ListComponent } from '../components/List';
import { onItemClick, toggleItemsDirection, onAddNewItem } from '../actions/actions';


function getSortedItems(list: Immutable.List<IItem>, orderBy: string): Immutable.List<IItem> {
  const sortedAsc = list.sort((a, b) => (a.text).localeCompare((b.text))).toList();
  return orderBy === OrderBy.Ascending ? sortedAsc : sortedAsc.reverse().toList();
}

const memoized = memoizee(getSortedItems);

function mapStateToProps(state: IStore): IListDataProps {
  const sortedItems = memoized(state.listItems, state.orderBy);
  return {
    orderBy: state.orderBy,
    items: sortedItems,
  };
}

function mapDispatchToProps(dispatch: Dispatch): IListCallbackProps {
  return {
    onToggleOrderClick: () => dispatch(toggleItemsDirection()),
    onItemClick: (itemId: string) => dispatch(onItemClick(itemId)),
    onAddNewItem: (text: string) => dispatch(onAddNewItem(text))
  };
}

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

