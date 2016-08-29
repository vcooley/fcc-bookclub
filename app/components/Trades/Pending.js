import React from 'react';
import { connect } from 'react-redux';
import { approvePending, declinePending, getPending } from '../../actions/trades';
import List from './List';

class Pending extends React.Component {
  componentWillMount() {
    this.props.retrievePendingTrades();
  }

  render() {
    return (
      <List trades={this.props.trades} onApprove={this.props.handleApproveTrade}
        onDecline={this.props.handleDeclineTrade} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trades: state.trades.pending.trades,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrievePendingTrades: () => dispatch(getPending()),
    handleApproveTrade: (tradeId) => dispatch(approvePending(tradeId)),
    handleDeclineTrade: (tradeId) => dispatch(declinePending(tradeId)),
  };
};

Pending.propTypes = {
  trades: React.PropTypes.array,
  retrievePendingTrades: React.PropTypes.func,
  handleApproveTrade: React.PropTypes.func,
  handleDeclineTrade: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
