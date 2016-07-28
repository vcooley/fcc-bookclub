var config = require('../knexfile')[process.env.NODE_ENV];
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');
bookshelf.plugin('registry');

knex.migrate.latest();

module.exports = bookshelf;
