module.exports = (knex, Promise) => () => {
  return Promise.all([
    knex('users').insert({ id: 1, name: 'Johnny Appleseed', location: 'Paris, France' }),
    knex('users').insert({ id: 2, name: 'Jeb Bush', location: 'Tallahassee, Florida' }),
    knex('users').insert({ id: 3, name: 'King Louis III', location: 'Paris, France' }),
  ]);
};
