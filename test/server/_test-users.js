const request = require('supertest-as-promised');

const users = exports.users = [
  {
    id: 1,
    email: 'test1@test.com',
    password: 'test',
  },
  {
    id: 2,
    email: 'test2@test.com',
    password: 'test',
  },
  {
    id: 3,
    email: 'test3@test.com',
    password: 'test',
  },
];

exports.getUserTokens = () => {
  return Promise.all(users.map(user => {
    return request(require('../../server'))
    .post('/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200)
    .then(res => res.body.token);
  }));
};
