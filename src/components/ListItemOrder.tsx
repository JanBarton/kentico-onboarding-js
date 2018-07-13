import * as React from 'react';
import * as PropTypes from 'prop-types';
import { OrderBy } from '../reducers/IStore';

interface IListItemOrderDataProps {
  readonly orderDirection: OrderBy;
}

interface IListItemOrderCallbackProps {
  readonly onSortByToggle: () => void;
}

interface IListItemOrderProps extends IListItemOrderDataProps, IListItemOrderCallbackProps {
}

export class ListItemOrder extends React.PureComponent<IListItemOrderProps> {
  static displayName = 'ListItemOrder';
  static propTypes = {
    onSortByToggle: PropTypes.func.isRequired,
    orderDirection: PropTypes.string.isRequired,
  };

  onSortByToggle = (): void => {
    this.props.onSortByToggle();
  };

  render() {
    return (
      <button className="btn" onClick={this.onSortByToggle}>
        Seradit podle abecedy: {this.props.orderDirection === OrderBy.Ascending ? 'Sestupne' : 'Vzestupne'}
      </button>
    );
  }
}
