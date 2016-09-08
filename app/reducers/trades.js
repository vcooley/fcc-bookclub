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
      const updated = Object.assign({}, state);
      updated[action.domain] = {
        updated: Date.now(),
        trades: state[action.domain].trades.filter(trade => trade.id !== action.tradeId),
      };
      return updated;
    default:
      return state;
  }
}
