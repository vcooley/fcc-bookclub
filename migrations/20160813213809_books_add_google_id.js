
exports.up = function(knex, Promise) {
  return knex.schema.table('books', table => {
    return table.string('google_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('books', table => {
    return table.dropColumn('google_id');
  });
};
