module.exports = (knex, Promise) => {
  return {
    deleteAll: require('./delete-all')(knex, Promise),
    seedBooks: require('./seed-books')(knex, Promise),
    seedTrades: require('./seed-trades')(knex, Promise),
    seedUsers: require('./seed-users')(knex, Promise),
    seedUsersBooks: require('./seed-users-books')(knex, Promise),
  };
};
