import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';

const mapStateToProps = ({ nodesList: { nodesIds } }) => ({
  nodesIds,
});

export const List = connect(mapStateToProps)(ListComponent);
