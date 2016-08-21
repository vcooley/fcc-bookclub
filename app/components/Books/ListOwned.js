import React from 'react';
import { connect } from 'react-redux';
import { getMyBooks } from '../../actions/books';
import ListContainer from './ListContainer';
import Add from './Add';

class ListOwned extends React.Component {
  componentWillMount() {
    return this.props.dispatch(getMyBooks());
  }

  render() {
    return (
      <div className="book-list-container container-fluid">
        <Add />
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

ListOwned.propTypes = {
  books: React.PropTypes.array,
};

export default connect(mapStateToProps)(ListOwned);
