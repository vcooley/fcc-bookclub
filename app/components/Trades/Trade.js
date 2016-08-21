import React from 'react';
import Book from '../Books/Book';

class Trade extends React.Component {
  render() {
    return (
      <Book book={this.props.trade}/>
    );
  }
}

Trade.propTypes = {
  trade: React.PropTypes.object,
};

export default Trade;
