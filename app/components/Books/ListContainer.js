import React from 'react';
import Book from './Book';

class ListContainer extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <div className="book-list-container container-fluid">
        <div className="book-list row">
          {books.map((book, index) => <Book key={index} book={book} />)}
        </div>
      </div>
    );
  }
}

export default ListContainer;
