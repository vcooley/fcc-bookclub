const bookshelf = require('../config/bookshelf');

require('./User');

const Book = bookshelf.Model.extend({
  tableName: 'books',
  owners: function() {
    return this.belongsToMany('User', 'users_books', 'book_id', 'user_id');
  }
});

module.exports = bookshelf.model('Book', Book);
