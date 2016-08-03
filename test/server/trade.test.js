const test = require('ava');
const request = require('supertest-as-promised');
const testUsers = require('./_test-users');
const Trade = require('../../models/Trade');

const makeApp = () => {
  return require('../../server');
};

const getToken = user => {
  return request(makeApp())
    .post('/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200)
    .then(res => res.body.token);
};

const testTrade = {
  requester: 1,
  requestee: 2,
  requestee_book: 1,
};

let TOKEN_1;
let TOKEN_2;

test.before('Get users\' tokens', async t => {
  [TOKEN_1, TOKEN_2] = await Promise.all([
    getToken(testUsers[0]),
    getToken(testUsers[1]),
  ])
  .catch(t.fail);
  return;
});

test('should not add a trade for unauthenticated user', t => {
  return request(makeApp())
    .post('/api/trade')
    .set('Accept', 'application/json')
    .then(res => t.is(res.status, 401));
});

test('should add a trade for an authenticated user', async t => {
  return request(makeApp())
    .post('/api/trade')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .set('Accept', 'application/json')
    .send({
      requestee: 2,
      requesteeBook: 2,
    })
    .then(res => {
      return t.is(res.status, 200);
    });
});

test('should approve a trade for a user', async t => {
  const trade = await new Trade(testTrade).save();
  return request(makeApp())
    .post(`/api/trade/${trade.id}/approve`)
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .send()
    .then(res => {
      t.is(res.status, 200);
      return trade.refresh()
        .then(updated => t.is(updated.get('requester_approval'), true));
    });
});

test('should not approve a trade for unauthenticated users', async t => {
  const trade = await new Trade(testTrade).save();
  await request(makeApp())
    .post(`/api/trade/${trade.id}/approve`)
    .set('Authorization', 'Bearer poop')
    .send()
    .then(res => {
      t.is(res.status, 401);
    });

  return trade.refresh()
    .then(updated => t.is(updated.get('requester_approval'), false));
});

test('should allow requestee and requester to add/edit book to trade', async t => {
  const trade = await new Trade(testTrade).save();
  await request(makeApp())
    .post(`/api/trade/${trade.id}/select-book/2`)
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .send()
    .then(res => {
      t.is(res.status, 200);
    });
  await trade.refresh()
    .then(updated => t.is(updated.get('requestee_book'), 2));
  await request(makeApp())
    .post(`/api/trade/${trade.id}/select-book/1`)
    .set('Authorization', `Bearer ${TOKEN_2}`)
    .send()
    .then(res => {
      t.is(res.status, 200);
    });
  return trade.refresh()
    .then(updated => t.is(updated.get('requester_book'), 1));
});
