import React from 'react';
import Book from '../Books/Book';

class Trade extends React.Component {
  render() {
    const { trade, onApprove, onDecline } = this.props;
    let buttons;
    if (onApprove && onDecline) {
      buttons = (
        <div className="row">
          <div className="col-xs-1">
            <button onClick={onApprove.bind(this, trade.id)} className="btn btn-success">
              <span className="glyphicon glyphicon-ok"></span>
            </button>
          </div>
          <div className="col-xs-1 col-xs-offset-9">
            <button onClick={onDecline.bind(this, trade.id)} className="btn btn-danger">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="trade-container container">
        <div className=" row">
          <div className="trade-book col-xs-6">
            <Book book={this.props.trade.requester_book}/>
          </div>
          <div className="trade-book col-xs-6">
            <Book book={this.props.trade.requestee_book} />
          </div>
        </div>
        {buttons}
      </div>
    );
  }
}

Trade.propTypes = {
  trade: React.PropTypes.object,
  onApprove: React.PropTypes.func,
  onDecline: React.PropTypes.func,
};

export default Trade;
