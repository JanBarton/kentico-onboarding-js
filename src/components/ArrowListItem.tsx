import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IArrowListItemDataProps {
  readonly id: string;
  readonly arrowItem: string;
}

export interface IArrowListItemCallbackProps {

}

interface IArrowListItemProps extends IArrowListItemCallbackProps, IArrowListItemDataProps {
}

export class ArrowListItem extends React.PureComponent<IArrowListItemProps> {
  static displayName: 'ArrowListItem';
  static propTypes = {
    id: PropTypes.string.isRequired,
    arrowItem: PropTypes.string.isRequired
  };

  render() {
    return (
      <React.Fragment>
        <li id={this.props.id} className="arrow-item">
          {this.props.arrowItem}
          <button>Up</button>
          <button>Down</button>
        </li>
      </React.Fragment>
    );
  };
}

