import React from 'react';
import Book from './Book';

class ListContainer extends React.Component {
  render() {
    const books = this.props.books;
    return (
        <div className="book-list">
          {books.map((book, index) => {
            return (
              <div key={index} className="book-container">
                <Book book={book} />
              </div>
            );
          })}
        </div>
    );
  }
}

export default ListContainer;
