import React from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/books';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(addBook(this.state.search));
  }

  handleTextChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add a book."
              onChange={this.handleTextChange}
            />
            <button type="submit" className="btn btn-default">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Add);
