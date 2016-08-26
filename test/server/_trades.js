const Trade = require('../../models/Trade');

exports.trades = {

};

exports.createNew = function createNew(options) {
  const defaultTrade = {
    requester: 1,
    requestee: 2,
    requester_book: 1,
    requestee_book: 2,
    requester_approval: false,
    requestee_approval: false,
  };
  const newTrade = Object.assign({}, defaultTrade, options);
  return Trade.forge(newTrade).save();
};
