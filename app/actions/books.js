export function getBooks() {
  return (dispatch) => {
    return fetch('/api/book')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        dispatch({
          type: 'BOOK_FETCH_FAILURE',
          messages: 'Failed to fetch available books.',
        });
        return [];
      })
      .then(books => {
        return dispatch({
          type: 'UPDATE_BOOKS',
          books,
        });
      });
  };
}
