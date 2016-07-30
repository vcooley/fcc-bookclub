module.exports = (knex, Promise) => () => {
  return knex('users_books').del()
  .then(() => knex('trades').del())
  .then(() => {
    return Promise.all([
      knex('users').del(),
      knex('books').del(),
    ]);
  });
};
