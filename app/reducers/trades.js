const defaultState = {
  completed: {
    updated: null,
    trades: [],
  },
  pending: {
    updated: null,
    trades: [],
  },
  requests: {
    updated: null,
    trades: [],
  },
};

export default function trades(state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_TRADES':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
