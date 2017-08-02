import { connect } from 'react-redux';
import * as React from 'react';

import { List as ListComponent, IListDataProps } from '../components/List';
import { IAppState } from '../reducers/IAppState';

const mapStateToProps = ({nodesList: {nodesIds}}: IAppState): IListDataProps => ({
  nodesIds,
});

export const List: React.ComponentClass = connect(mapStateToProps)(ListComponent);
