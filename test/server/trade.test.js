const test = require('ava');
const request = require('supertest');
const app = require('../../server');

const agent = request.agent(app);
agent
  .post('/login')
  .send({
    email: 'test1@test.com',
    password: 'test'
  })
  .expect(200)
  .end();

test('should not add a trade for unauthenticated user', t => {
  request(app)
    .post('/api/trade')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end(() => t.pass());
});

test('should add a trade for an authenticated user', t => {
  agent.post('/api/trade')
    .set('Accept', 'application/json')
    .send({
      requestee: 2,
      requestee_book: 2
    })
    .expect(200)
    .end();
});
