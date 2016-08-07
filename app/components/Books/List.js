import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/books';
import _ from 'lodash';
import Book from './Book';
import Add from './Add';

class BookList extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getBooks());
  }

  render() {
    const books = this.props.books;
    const rowLength = 3;
    const bookRows = _.chunk(books, rowLength);
    return (
      <div className="book-list-container">
        <Add />
        <div className="book-list">
          {bookRows.map((row, rowIndex) => {
            return (
              <div className="book-row" key={rowIndex}>
                {row.map((book, bookIndex) => {
                  return <Book key={(rowIndex + 1) * (bookIndex + 1)} book={book} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

BookList.propTypes = {
  books: React.PropTypes.array,
};

export default connect(mapStateToProps)(BookList);
