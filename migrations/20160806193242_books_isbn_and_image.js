
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('books', table => {
      table.bigInteger('isbn');
      table.text('image_url');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('books', table => {
      table.dropColumn('isbn');
      table.dropColumn('image_url');
    }),
  ]);
};
