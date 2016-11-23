exports.up = function (knex, Promise) {
  return knex.schema.createTable('books', table => {
    table.increments('id').primary();
    table.string('title');
    return table.string('description');
  })
  .then(() => Promise.all([
    knex.schema.createTable('users_books', table => {
      table.integer('user_id').references('users.id');
      table.integer('book_id').references('books.id');
    }),
    knex.schema.createTable('trades', table => {
      table.increments('id').primary();
      table.integer('requester').references('users.id');
      table.integer('requestee').references('users.id');
      table.integer('requester_book').references('books.id');
      table.integer('requestee_book').references('books.id');
      table.boolean('requester_approval').defaultTo(false);
      table.boolean('requestee_approval').defaultTo(false);
    }),
  ]));
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books'),
    knex.schema.dropTable('users_books'),
    knex.schema.dropTable('trades'),
  ]);
};
