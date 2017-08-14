import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IViewItem } from '../models/ViewItem';

export interface IViewItemDataProps {
  item: IViewItem;
}

export interface IViewItemCallbackProps {
  onClick: () => void;
}

const ViewItem: React.StatelessComponent<IViewItemDataProps & IViewItemCallbackProps> = (props) => (
  <div className="btn btn-block " onClick={props.onClick} title="Click to edit this item">
    <div className="text-left">
      <span>
        {props.item.index}.
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

export { ViewItem };
