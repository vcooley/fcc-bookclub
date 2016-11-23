import React from 'react';

class MissingBook extends React.Component {
  render() {
    const { message, requestee } = this.props;
    return (
      <div className="missing-book">
        {requestee ? (
          <a>
            <h2>{message}</h2>
          </a>
        ) : (
          <div>
            <h2>{message}</h2>
          </div>
        )}
      </div>
    );
  }
}

export default MissingBook;
