const defaultState = {
  completed: {
    updated: undefined,
    trades: [],
  },
  pending: {
    updated: undefined,
    trades: [],
  },
  requests: {
    updated: undefined,
    trades: [],
  },
};

export default function trades(state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_TRADES':
      return Object.assign({}, state, action.data);
    case 'REMOVE_TRADE':
      return state[action.domain].trades.filter(trade => trade.id !== action.tradeId);
    default:
      return state;
  }
}
