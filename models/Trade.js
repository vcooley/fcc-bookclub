const bookshelf = require('../config/bookshelf');

require('./User');
require('./Book');

const Trade = bookshelf.Model.extend({
  tableName: 'trades',
  requester() {
    return this.belongsTo('User', 'requester');
  },
  requestee() {
    return this.belongsTo('User', 'requestee');
  },
  requester_book() {
    return this.belongsTo('Book', 'requester_book');
  },
  requestee_book() {
    return this.belongsTo('Book', 'requestee_book');
  },
});

module.exports = bookshelf.model('Trade', Trade);
