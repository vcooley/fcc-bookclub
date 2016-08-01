const test = require('ava');
const request = require('supertest-as-promised');

const makeApp = () => {
  return require('../../server');
};

test('GET /', t => {
  return request(makeApp())
  .get('/')
  .expect(200)
  .then(() => t.pass());
});

test('GET /contact', t => {
  return request(makeApp())
  .get('/contact')
  .expect(200)
  .then(() => t.pass());
});
