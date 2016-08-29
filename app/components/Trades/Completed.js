import React from 'react';
import { connect } from 'react-redux';
import { getCompleted } from '../../actions/trades';
import List from './List';

class Completed extends React.Component {
  componentWillMount() {
    this.props.retrieveCompleted();
  }

  render() {
    return (
      <List trades={this.props.trades} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trades: state.trades.completed.trades,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveCompleted: () => dispatch(getCompleted()),
  };
};

Completed.propTypes = {
  trades: React.PropTypes.array,
  retrieveCompleted: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
