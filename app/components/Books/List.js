import React from 'react';
import Book from './Book';

class ListContainer extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <div className="container-fluid">
        <div className="book-list row">
          {books.map((book, index) => {
            return (
              <div className="book-container">
                <Book key={index} book={book} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListContainer;
