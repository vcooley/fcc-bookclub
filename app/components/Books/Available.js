import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import { getAvailableBooks } from '../../actions/books';

class Available extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getAvailableBooks());
  }

  render() {
    return (
      <div className="book-list-container container-fluid">
        <List books={this.props.books} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

Available.propTypes = {
  books: React.PropTypes.array,
};

export default connect(mapStateToProps)(Available);
