import React from 'react';
import Nav from './Nav';

class TradeContainer extends React.Component {
  render() {
    return (
      <div className="trade-list-container container-fluid">
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default TradeContainer;
