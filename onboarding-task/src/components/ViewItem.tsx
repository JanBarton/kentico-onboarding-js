import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';

import { IViewItem } from '../models/ViewItem';

export interface IViewItemDataProps {
  item: IViewItem;
}

export interface IViewItemCallbackProps {
  onClick: () => void;
}

export const ViewItem: React.StatelessComponent<IViewItemDataProps & IViewItemCallbackProps> = (props) => (
  <div className={classNames('btn', 'btn-block', {disabled: !props.item.isStored})}
       onClick={props.item.isStored ? props.onClick : undefined}
       title={props.item.isStored ? 'Click to edit this item' : 'This item has not yet been stored'}>
    <div className="text-left">
      <span className="font-weight-bold">
        {props.item.index}.{' '}
      </span>
      {props.item.text}
    </div>
  </div>);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
};
