import React from 'react';

class Book extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <div className="book-container">
          <img className="book-image img-responsive" src={book.image_url} />
        <div className="book-title">{book.title}</div>
      </div>
    );
  }
}

export default Book;
