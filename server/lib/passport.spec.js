/* global describe it */
require('babel-core/register');

const request = require('supertest');
const server = require('../core/webserver');

describe('Passport Tests', function test() {
  this.timeout(10000);

  it('login route with no credentials should fail with 401', (done) => {
    request(server.app())
      .post('/api/users/login')
      .expect(401)
      .expect('Missing credentials', done);
  });

  it('signup route with no credentials should fail with 401', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .expect(401)
      .expect('Missing credentials', done);
  });
});
