import React from 'react';
import Book from '../Books/Book';

class Trade extends React.Component {
  render() {
    return (
      <div>
        <Book book={this.props.trade}/>
      </div>
    );
  }
}

Trade.propTypes = {
  trade: React.PropTypes.object,
};

export default Trade;
