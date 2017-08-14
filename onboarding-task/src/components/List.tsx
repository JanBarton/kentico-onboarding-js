const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Seq } from 'immutable';

import { AddItem } from '../containers/AddItem';
import { ListItem } from '../containers/ListItem';
import { emptyUuid } from '../utils/constants';

export interface IListDataProps {
  itemIds: Seq.Indexed<string>;
}

const List: React.StatelessComponent<IListDataProps> = (props) => {
  const existingItems = props.itemIds.map((id = emptyUuid, index = 0) =>
    <li className="list-group-item" key={id}>
      <ListItem
        index={index + 1}
        id={id}
        key={id}
      />
    </li>
  );

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ol className="list-group">
          {existingItems}
          <AddItem />
        </ol>
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemIds: ImmutablePropTypes.iterableOf(PropTypes.string).isRequired,
};

export { List };
