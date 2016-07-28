
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users_books').del(),
    knex('trades').del(),
    knex('users').del(),
    knex('books').del(),

    // Books
    knex('books').insert({id: 1, title: 'JavaScript: The Good Parts'}),
    knex('books').insert({id: 2, title: 'All The King\'s Men'}),
    knex('books').insert({id: 3, title: 'Goodnight Moon'})

    // Users
    knex('users').insert({id: 1, name: 'Johnny Appleseed', location: 'Paris, France'}),
    knex('users').insert({id: 2, name: 'Jeb Bush', location: 'Tallahassee, Florida'}),
    knex('users').insert({id: 3, name: 'King Louis III', location: 'Paris, France'}),

    // Trades
    knex('trades').insert({
      id: 1,
      requester: 1,
      requestee: 2,
      requester_book: 1,
      requestee_book: 2,
      requester_approval: false,
      requestee_approval: false
    }),
    knex('trades').insert({
      id: 2,
      requester: 2,
      requestee: 3,
      requester_book: 1,
      requestee_book: 2,
      requester_approval: false,
      requestee_approval: false
    }),
    knex('trades').insert({
      id: 3,
      requester: 1,
      requestee: 3,
      requester_book: 3,
      requestee_book: 1,
      requester_approval: false,
      requestee_approval: false
    }),

    // UsersBooks
    knex('users_books').insert({user_id: 1, book_id: 1}),
    knex('users_books').insert({user_id: 1, book_id: 3}),
    knex('users_books').insert({user_id: 2, book_id: 2}),
    knex('users_books').insert({user_id: 2, book_id: 1}),
    knex('users_books').insert({user_id: 3, book_id: 2}),
    knex('users_books').insert({user_id: 3, book_id: 1})
  );
};
