import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

export const UPDATE_TRADES = 'UPDATE_TRADES';
export const REMOVE_TRADE = 'REMOVE_TRADE';

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

function deleteTradeResource(tradeId) {
  return fetch(`/api/trade/${tradeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${loadToken()}`,
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus);
}

export function getPending() {
  return (dispatch) => {
    return getTradeResource('/api/trade/pending')
      .then(data => {
        return dispatch({
          type: UPDATE_TRADES,
          data: {
            pending: {
              trades: data,
              updated: Date.now(),
            },
          },
        });
      });
  };
}

export function makePending(trade) {
  return (dispatch) => {
    console.log(trade)
    return fetch('/api/trade/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loadToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trade),
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(() => {
        return dispatch({
          type: 'ADD_TRADE_SUCCESS',
          messages: ['Successfully requested a trade.'],
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

export function approvePending(tradeId) {
  return (dispatch) => {
    return fetch(`/api/trade/${tradeId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loadToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(() => {
        return dispatch({
          type: 'ADD_TRADE_SUCCESS',
          messages: ['Successful approved trade.'],
        });
      })
      .catch(() => {
        return dispatch({
          type: 'ADD_TRADE_FAILURE',
          messages: ['There was a problem approving that trade.'],
        });
      });
  };
}

export function declinePending(tradeId) {
  return (dispatch) => {
    return deleteTradeResource(tradeId)
      .then(() => {
        return dispatch({
          type: REMOVE_TRADE,
          domain: 'pending',
          tradeId,
        });
      })
      .then(() => {
        return dispatch({
          type: 'REMOVE_TRADE_SUCCESS',
          messages: ['Trade successfully removed.'],
        });
      })
      .catch((err) => {
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
          data: {
            requests: {
              trades: data,
              updated: Date.now(),
            },
          },
        });
      });
  };
}

export function approveRequest(tradeId) {
  return (dispatch) => {
    return fetch(`/api/trade/${tradeId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loadToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: 'ADD_TRADE_SUCCESS',
          messages: ['Successful accepted a trade.'],
        });
      })
      .catch(() => {
        return dispatch({
          type: 'ADD_TRADE_FAILURE',
          messages: ['There was a problem accepting that trade.'],
        });
      });
  };
}

export function declineRequest(tradeId) {
  return (dispatch) => {
    return deleteTradeResource(tradeId)
      .then(() => {
        return dispatch({
          type: REMOVE_TRADE,
          domain: 'requests',
          tradeId,
        });
      })
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

export function getCompleted() {
  return (dispatch) => {
    return getTradeResource('/api/trade/completed')
      .then(data => {
        return dispatch({
          type: UPDATE_TRADES,
          data: {
            completed: {
              trades: data,
              updated: Date.now(),
            },
          },
        });
      });
  };
}
