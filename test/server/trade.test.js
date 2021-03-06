const test = require('ava');
const request = require('supertest-as-promised');
const Trade = require('../../models/Trade');
const makeApp = require('./_app');
const userFixtures = require('./_users');

const testTrade = {
  requester: 1,
  requestee: 2,
  requestee_book: 1,
};

let TOKEN_1;
let TOKEN_2;

function approveTrade(tradeId, token) {
  return request(makeApp())
    .post(`/api/trade/${tradeId}/approve`)
    .set('Authorization', `Bearer ${token}`)
    .send();
}

test.before('Get users\' tokens', async t => {
  try {
    [TOKEN_1, TOKEN_2] = await userFixtures.getUserTokens();
  } catch (err) {
    console.log(err);
    t.fail();
  }
  return;
});

test('should get a user\'s pending trades', t => {
  return request(makeApp())
    .get('/api/trade/pending')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .then(res => {
      res.body.map(trade => {
        t.is(trade.requester, 1);
        t.false(trade.requester_approval && trade.requestee_approval);
      });
    });
});

test('should get a user\'s trade requests', t => {
  return request(makeApp())
    .get('/api/trade/requests')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .then(res => {
      res.body.map(trade => {
        t.is(trade.requestee, 1);
        t.false(trade.requester_approval && trade.requestee_approval);
      });
    });
});

test('should get a user\'s completed trades', t => {
  return request(makeApp())
    .get('/api/trade/completed')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .then(res => {
      res.body.map(trade => {
        t.true(trade.requester === 1 || trade.requestee === 1);
        t.true(trade.requester_approval && trade.requestee_approval);
      });
    });
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

test('should request trade as one user, then accept it as another', async t => {
  const app = makeApp();
  const tradeId = await request(app)
    .post('/api/trade/')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .send({ requestee: 2, requesteeBook: 1 })
    .then(res => {
      t.is(res.status, 200);
      t.truthy(res.body.id);
      return res.body.id;
    });
  await approveTrade(tradeId, TOKEN_1)
    .then(res => {
      return t.is(res.status, 200);
    });
  await approveTrade(tradeId, TOKEN_2)
    .then(res => {
      return t.is(res.status, 200);
    });
  return Trade.forge({ id: tradeId }).fetch()
    .then(trade => trade.toJSON())
    .then(trade => {
      t.true(trade.requester_approval);
      t.true(trade.requestee_approval);
    });
});

test('should request trade as one user, approve it, then decline it as another', async t => {
  const app = makeApp();
  const tradeId = await request(app)
    .post('/api/trade/')
    .set('Authorization', `Bearer ${TOKEN_1}`)
    .send({ requestee: 2, requesteeBook: 1 })
    .then(res => {
      t.is(res.status, 200);
      t.truthy(res.body.id);
      return res.body.id;
    });
  await approveTrade(tradeId, TOKEN_1)
    .then(res => {
      return t.is(res.status, 200);
    });
  await request(app)
    .delete(`/api/trade/${tradeId}`)
    .set('Authorization', `Bearer ${TOKEN_2}`)
    .then(res => t.is(res.status, 204));

  return Trade.forge({ id: tradeId }).fetch()
    .then(trade => {
      if (trade) {
        return t.fail();
      }
      return t.pass();
    });
});
