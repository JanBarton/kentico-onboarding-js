import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItem } from '../reducers/IStore';
export interface IArrowListItemDataProps {
  readonly arrowItem: IItem;
}

export interface IArrowListItemCallbackProps {

}

interface IArrowListItemProps extends IArrowListItemCallbackProps, IArrowListItemDataProps {
}

export class ArrowListItem extends React.PureComponent<IArrowListItemProps> {
  static displayName: 'ArrowListItem';
  static propTypes = {
    arrowItem: PropTypes.object.isRequired
  };

  render() {
    return (
      <li className="arrow-item list-group-item">
        {this.props.arrowItem.text}
        <button className="button-up">Up</button>
        <button className="button-down">Down</button>
      </li>
    );
  };
}

