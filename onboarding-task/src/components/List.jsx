import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { ListItemInput } from './ListItemInput';
import { ListItem } from '../containers/ListItem';
import { keyMap } from '../constants/keyMap';

export const List = ({ itemIds, onCreateItem }) => (
  <HotKeys keyMap={keyMap}>
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <ol className="list">
          {
            itemIds.map(id => (
              <li key={id}>
                <ListItem id={id} />
              </li>
            ))
          }
        </ol>
        <ListItemInput onCreateItem={onCreateItem} />
      </div>
    </div>
  </HotKeys>
);

List.displayName = 'List';

List.propTypes = {
  itemIds: PropTypes.array.isRequired,
  onCreateItem: PropTypes.func.isRequired,
};
