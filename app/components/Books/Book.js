import React from 'react';

class Book extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <div className="book-container col-xs-3">
        <img className="book-image" src={book.image_url} />
        <div className="book-title">{book.title}</div>
      </div>
    );
  }
}

export default Book;
