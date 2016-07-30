module.exports = (knex, Promise) => () => {
  return Promise.all([
    knex('books').insert({ id: 1, title: 'JavaScript: The Good Parts' }),
    knex('books').insert({ id: 2, title: 'All The King\'s Men' }),
    knex('books').insert({ id: 3, title: 'Goodnight Moon' }),
  ]);
};
