import React from 'react';
import { connect } from 'react-redux';
import { getMyBooks } from '../../actions/books';
import Book from './Book';
import Add from './Add';

class BookList extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getMyBooks());
  }

  render() {
    const books = this.props.books;
    return (
      <div className="book-list-container container-fluid">
        <Add />
        <div className="book-list row">
          {books.map((book, index) => <Book key={index} book={book} />)}
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
