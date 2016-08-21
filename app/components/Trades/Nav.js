import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return(
      <ul role="nav" className="row">
        <li><Link to="/trades/requests">Requests</Link></li>
        <li><Link to="/trades/pending">Pending</Link></li>
        <li><Link to="/trades/completed">Completed</Link></li>
      </ul>
    );
  }
}

export default Nav;
