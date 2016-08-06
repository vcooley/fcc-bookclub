import React from 'react';

class Book extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <div className="book-container">
        <img className="book-image" src={book.image} />
        <div className="book-title">{book.title}</div>
      </div>
    );
  }
}

export default Book;
