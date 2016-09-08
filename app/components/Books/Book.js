import React from 'react';
import { connect } from 'react-redux';
import { makePending } from '../../actions/trades';

class Book extends React.Component {
  requestBook(book) {
    return this.props.dispatch(makePending({
      requestee: book.owners[0].id,
      requesteeBook: book.id,
    }));
  }

  render() {
    const book = this.props.book;
    return (
      <div className="book">
          <img className="book-image img-responsive" src={book.image_url} />
        <div className="book-title">{book.title}</div>
        <div>
          <button onClick={this.requestBook.bind(this, book)}
            className="btn btn-success">Request</button>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    image_url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    owners: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }),
};

export default connect()(Book);
