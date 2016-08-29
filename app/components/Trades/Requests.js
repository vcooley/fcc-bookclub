import React from 'react';
import { connect } from 'react-redux';
import { approveRequest, declineRequest, getRequests } from '../../actions/trades';
import List from './List';

class Requests extends React.Component {
  componentWillMount() {
    this.props.retrieveRequests();
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
    trades: state.trades.requests.trades,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveRequests: () => dispatch(getRequests()),
    handleApproveTrade: (tradeId) => dispatch(approveRequest(tradeId)),
    handleDeclineTrade: (tradeId) => dispatch(declineRequest(tradeId)),
  };
};

Requests.propTypes = {
  trades: React.PropTypes.array,
  retrieveRequests: React.PropTypes.func,
  handleApproveTrade: React.PropTypes.func,
  handleDeclineTrade: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
