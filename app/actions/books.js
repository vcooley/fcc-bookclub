import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

function getBookResource(url) {
  const token = cookie.load('token');
  return (dispatch) => {
    return fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
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

export function getAvailableBooks() {
  return getBookResource('/api/book/available');
}

export function getMyBooks() {
  return getBookResource('/api/book/me');
}

export function addBook(title) {
  return dispatch => {
    const token = cookie.load('token');
    return fetch('/api/book', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
