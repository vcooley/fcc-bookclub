import React from 'react';
import { connect } from 'react-redux';
import ListContainer from './ListContainer';
import { getAvailableBooks } from '../../actions/books';

class ListAvailable extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getAvailableBooks());
  }

  render() {
    return (
      <div className="book-list-container container-fluid">
        <ListContainer books={this.props.books} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

ListAvailable.propTypes = {
  books: React.PropTypes.array,
};

export default connect(mapStateToProps)(ListAvailable);
