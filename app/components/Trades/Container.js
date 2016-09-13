import React from 'react';

class TradeContainer extends React.Component {
  render() {
    return (
      <div className="trade-list-container">
        {this.props.children}
      </div>
    );
  }
}

export default TradeContainer;
