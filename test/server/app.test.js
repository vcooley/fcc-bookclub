const test = require('ava');
const request = require('supertest');
const server = require('../../server');

test('GET /', t => {
  request(server)
  .get('/')
  .expect(200, t.pass);
});

test('GET /contact', t => {
  request(server)
  .get('/contact')
  .expect(200, t.pass);
});
