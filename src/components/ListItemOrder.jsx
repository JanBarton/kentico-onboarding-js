import React, { PropTypes } from 'react';

export class ListItemOrder extends React.PureComponent {
  static displayName = 'ListItemOrder';
  static propTypes = {
    onSortByToggle: PropTypes.func.isRequired,
    orderDirection: PropTypes.string.isRequired,
  };

  onSortByToggle = () => {
    this.props.onSortByToggle();
  };

  render() {
    return (
      <button className="btn" onClick={this.onSortByToggle}>
        Seradit podle abecedy: {this.props.orderDirection === 'asc' ? 'Sestupne' : 'Vzestupne'}
      </button>
    );
  }
}
