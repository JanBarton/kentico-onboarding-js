import * as React from 'react';
import { connect } from 'react-redux';
import * as memoize from 'memoizee';

import { List as ListComponent } from '../components/List';
import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { IStore } from '../interfaces/IStore';

const getIdsMemoized = memoize((items: ItemsDataMap) => items.keySeq());

const mapStateToProps = (state: IStore) => ({
  itemIds: getIdsMemoized(state.list.itemsById),
});

const List: React.ComponentClass = connect(mapStateToProps)(ListComponent);
export { List };
