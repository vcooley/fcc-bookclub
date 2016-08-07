import React from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/books';

class Add extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <form onSumbit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Add a book."/>
            <button type="submit" className="btn btn-default">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Add);
