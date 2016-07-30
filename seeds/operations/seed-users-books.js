module.exports = (knex, Promise) => () => {
  return Promise.all([
    knex('users_books').insert({ user_id: 1, book_id: 1 }),
    knex('users_books').insert({ user_id: 1, book_id: 3 }),
    knex('users_books').insert({ user_id: 2, book_id: 2 }),
    knex('users_books').insert({ user_id: 2, book_id: 1 }),
    knex('users_books').insert({ user_id: 3, book_id: 2 }),
    knex('users_books').insert({ user_id: 3, book_id: 1 }),
  ]);
};
