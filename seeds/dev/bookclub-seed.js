
exports.seed = (knex, Promise) => {
  const operations = require('../operations')(knex, Promise);

  return operations.deleteAll()
  .then(operations.seedBooks)
  .then(operations.seedUsers)
  .then(operations.seedUsersBooks)
  .then(operations.seedTrades);
};
