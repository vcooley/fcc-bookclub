import React from 'react';
import { connect } from 'react-redux';
import { makePending } from '../../actions/trades';
import Book from './Book';

class ListContainer extends React.Component {
  requestBook(book) {
    return this.props.dispatch(makePending({
      requestee: book.owners[0].id,
      requesteeBook: book.id,
    }));
  }

  render() {
    const books = this.props.books;
    return (
        <div className="book-list">
          {books.map((book, index) => {
            return (
              <div key={index} className="book-container">
                <Book book={book} />
                <button onClick={this.requestBook.bind(this, book)}
                  className="btn btn-success request-button">Request</button>
              </div>
            );
          })}
        </div>
    );
  }
}

export default connect()(ListContainer);
