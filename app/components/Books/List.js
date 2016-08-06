import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/books';
import Book from './Book';
import Add from './Add';

class BookList extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getBooks());
  }

  render() {
    const books = this.props.books;
    return (
      <div>
        <Add />
        <div>
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

export default connect(mapStateToProps)(BookList);
