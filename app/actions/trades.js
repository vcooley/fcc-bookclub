import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

export const UPDATE_TRADES = 'UPDATE_TRADES';

const loadToken = () => cookie.load('token');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


function getTradeResource(endpoint) {
  const token = cookie.load('token');
  return fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  })
    .then(checkStatus)
    .then(res => res.json());
}

export function getPending() {
  return (dispatch) => {
    return getTradeResource('/api/trade/pending')
      .then(data => {
        return dispatch({
          type: UPDATE_TRADES,
          pending: {
            updated: Date.now(),
            trades: data,
          },
        });
      });
  };
}

export function makePending(trade) {
  return (dispatch) => {
    return fetch('/api/trade/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loadToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: trade,
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(() => {
        return dispatch({
          type: 'ADD_TRADE_SUCCESS',
          messages: ['Successful requested a trade.'],
        });
      })
      .catch(() => {
        return dispatch({
          type: 'ADD_TRADE_FAILURE',
          messages: ['There was a problem requesting that trade.'],
        });
      });
  };
}

export function approvePending() {

}

export function declinePending(tradeId) {
  return (dispatch) => {
    return fetch(`/api/trade/${tradeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${loadToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(() => {
        return dispatch({
          type: 'REMOVE_TRADE_SUCCESS',
          messages: ['Trade successfully removed.'],
        });
      })
      .catch(() => {
        return dispatch({
          type: 'REMOVE_TRADE_FAILURE',
          messages: ['There was a problem removing that trade.'],
        });
      });
  };
}

export function getRequests() {
  return (dispatch) => {
    return getTradeResource('/api/trade/requests')
      .then(data => {
        return dispatch({
          type: UPDATE_TRADES,
          requests: {
            updated: Date.now(),
            trades: data,
          },
        });
      });
  };
}

export function acceptRequest() {

}

export function declineRequest() {

}

export function getCompleted() {
  return (dispatch) => {
    return getTradeResource('/api/trade/completed')
      .then(data => {
        return dispatch({
          type: UPDATE_TRADES,
          completed: {
            updated: Date.now(),
            trades: data,
          },
        });
      });
  };
}
