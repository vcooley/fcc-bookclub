import React from 'react';
import { connect } from 'react-redux';
import { getMyBooks } from '../../actions/books';
import List from './List';
import Add from './Add';

class Owned extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getMyBooks());
  }

  render() {
    return (
      <div className="book-list-container container-fluid">
        <Add />
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

Owned.propTypes = {
  books: React.PropTypes.array,
};

export default connect(mapStateToProps)(Owned);
