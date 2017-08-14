import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';
import { IViewItem } from '../models/ViewItem';

export interface IListItemDataProps {
  item: IViewItem;
}

export interface IListItemCallbackProps {
  onClick: () => void;
  onDelete: () => void;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps> = (props) => {
  if (props.item.isBeingEdited) {
    return (
      <EditItem
        item={props.item}
        onDelete={props.onDelete}
        onSave={props.onSave}
        onCancel={props.onCancel}
      />
    );
  }

  return (
    <ViewItem
      item={props.item}
      onClick={props.onClick}
    />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export { ListItem };
