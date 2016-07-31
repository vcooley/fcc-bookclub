var config = require('../knexfile')[process.env.NODE_ENV];
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');
bookshelf.plugin('registry');

knex.migrate.latest().catch(err => {
  if (process.env.NODE_ENV === 'test') {
    console.error('migrations failed in test environment: ignoring...');
  } else {
    throw err;
  }
});

module.exports = bookshelf;
