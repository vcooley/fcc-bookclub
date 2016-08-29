import React from 'react';
import { connect } from 'react-redux';
import Trade from './Trade';

class List extends React.Component {
  render() {
    const trades = this.props.trades;
    return(
      <div className="container-fluid">
        <div className="book-list row">
          {trades.map((trade, index) => <Trade key={index} trade={trade} />)}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  trades: React.PropTypes.array,
};

export default connect()(List);
