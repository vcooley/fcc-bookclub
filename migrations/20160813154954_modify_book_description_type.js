
exports.up = function(knex, Promise) {
  return knex.schema.table('books', table => {
    table.dropColumn('description');
  })
  .then(() => {
    return knex.schema.table('books', table => {
      return table.text('description');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('books', table => {
    table.dropColumn('description');
  })
  .then(() => {
    return knex.schema.table('books', table => {
      return table.string('description');
    });
  });
};
