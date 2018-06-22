import React, { PropTypes } from 'react';

export class ListItemOrder extends React.PureComponent {
  static displayName = 'ListItemOrder';
  static propTypes = {
    onItemAlphaSort: PropTypes.func.isRequired,
  };

  onClickOrder = () => {
    this.props.onItemAlphaSort(this.props.text);
  };

  render() {
    return (
      <button className="btn" onClick={this.onClickOrder}>Serad podle abecedy</button>
    );
  }
}
