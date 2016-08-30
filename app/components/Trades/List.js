import React from 'react';
import { connect } from 'react-redux';
import Trade from './Trade';

class List extends React.Component {
  render() {
    const { trades, onApprove, onDecline } = this.props;
    return(
      <div className="container-fluid">
        <div className="book-list row">
          {trades.map((trade, index) => <Trade key={index}
            trade={trade} onApprove={onApprove} onDecline={onDecline} />)}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  trades: React.PropTypes.array,
  onApprove: React.PropTypes.func,
  onDecline: React.PropTypes.func,
};

export default connect()(List);
