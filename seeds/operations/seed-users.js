const User = require('../../models/User');

module.exports = (knex, Promise) => () => {
  const users = [
    new User({
      id: 1,
      name: 'Johnny Appleseed',
      location: 'Paris, France',
      email: 'test1@test.com',
      password: 'test',
    }).save(null, { method: 'insert' }),
    new User({
      id: 2,
      name: 'Jeb Bush',
      location: 'Tallahassee, Florida',
      email: 'test2@test.com',
      password: 'test',
    }).save(null, { method: 'insert' }),
    new User({
      id: 3,
      name: 'King Louis III',
      location: 'Paris, France',
      email: 'test3@test.com',
      password: 'test',
    }).save(null, { method: 'insert' }),
  ];

  return Promise.all(users);
};
