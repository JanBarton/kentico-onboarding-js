import { connect } from 'react-redux';
import { IItemsDataProps, Items as ItemsComponent } from '../components/Items';
import { IAppState } from '../models/IAppState';
import { keySeqToArray } from '../utils/keySeqToArray';

const mapStateToProps = (state: IAppState): IItemsDataProps => ({
  itemIds: keySeqToArray(state.list.items.keySeq()),
});

export const Items = connect(
  mapStateToProps,
)(ItemsComponent);
