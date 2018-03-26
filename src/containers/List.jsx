import { connect } from 'react-redux';

import { selectKeys } from '../selectors/memorySelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  itemKeys: selectKeys(state.list.items).toArray(),
});

export const List = connect(mapStateToProps)(ListComponent);
