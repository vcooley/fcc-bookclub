import fetch from 'isomorphic-fetch';

export function getAvailableBooks() {
  return (dispatch) => {
    return fetch('/api/book/available')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        dispatch({
          type: 'FETCH_BOOK_FAILURE',
          messages: ['Failed to fetch available books.'],
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

export function getMyBooks() {

}

export function addBook(title) {
  return dispatch => {
    return fetch('/api/book', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: 'ADD_BOOK_SUCCESS',
        messages: ['Successfully added book.'],
      });
    })
    .catch(err => {
      return dispatch({
        type: 'ADD_BOOK_ERROR',
        messages: ['Failed to add book to collection.'],
      });
    });
  };
}
