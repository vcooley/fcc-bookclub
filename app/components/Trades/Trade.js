import React from 'react';
import Book from '../Books/Book';

class Trade extends React.Component {
  render() {
    return (
      <div className="trade-container row">
        <div className="trade-book col-xs-6">
          <Book book={this.props.trade.requester_book}/>
        </div>
        <div className="trade-book col-xs-6">
          <Book book={this.props.trade.requestee_book} />
        </div>
      </div>
    );
  }
}

Trade.propTypes = {
  trade: React.PropTypes.object,
};

export default Trade;
