import React from 'react';
import Book from '../Books/Book';
import MissingBook from './MissingBook';

class Trade extends React.Component {
  render() {
    const { trade, onApprove, onDecline } = this.props;
    let buttons;
    if (onApprove && onDecline) {
      buttons = (
        <div className="trade-button-row">
          <div className="accept-button">
            <button onClick={onApprove.bind(this, trade.id)} className="btn btn-success">
              <span className="glyphicon glyphicon-ok align-middle"></span>
              &nbsp;Approve
            </button>
          </div>
          <div className="decline-button">
            <button onClick={onDecline.bind(this, trade.id)} className="btn btn-danger">
              <span className="glyphicon glyphicon-remove align-middle"></span>
              &nbsp;Decline
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="trade-container">
        <div className="trade-book-container">
          <div className="trade-book">
            {trade.requester_book.id ? (
              <Book book={trade.requester_book} />
            ) : (
              <MissingBook message="Click here to request a book in this trade."/>
            )}
          </div>
          <div className="trade-book">
            {trade.requestee_book.id ? (
              <Book book={trade.requestee_book} />
            ) : (
              <MissingBook requestee={trade.requestee}
                message="Waiting for a book to be requested from you."/>
            )}
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
