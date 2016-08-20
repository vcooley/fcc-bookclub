const test = require('ava');
const request = require('supertest-as-promised');
const Book = require('../../models/Book');
const makeApp = require('./_app');
const userFixtures = require('./_test-users');

const testUsers = userFixtures.users;

let TOKEN_1;
let TOKEN_2;

test.before('Get users\' tokens', async t => {
  try {
    [TOKEN_1, TOKEN_2] = await userFixtures.getUserTokens();
  } catch (err) {
    console.log(err);
    t.fail();
  }
  return;
});

test('should add a book for a user', async t => {
  return request(makeApp())
    .post('/api/book')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .set('Accept', 'application/json')
    .send({ title: 'Humpty Dumpty' })
    .then(res => {
      t.is(res.status, 200);
      return res;
    })
    .then(res => {
      return Book.forge({ id: res.body.id }).fetch({ withRelated: ['owners'] }).then(book => {
        return t.is(book.toJSON().owners[0].id, testUsers[0].id);
      });
    });
});
