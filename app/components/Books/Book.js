import React from 'react';

class Book extends React.Component {

  render() {
    const book = this.props.book;
    return (
      <div className="book">
          <img className="book-image img-responsive" src={book.image_url} />
        <p className="book-title">{book.title}</p>
      </div>
    );
  }
}

Book.propTypes = {
  book: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    image_url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    owners: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }),
};

export default Book;
