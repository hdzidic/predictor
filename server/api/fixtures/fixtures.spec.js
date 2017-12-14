/* global describe it */
require('babel-core/register');

const request = require('supertest');
const server = require('../../core/webserver');

const database = require('../../db/database');

database.createDatabaseAndConnect();

describe('API Tests', function test() {
  this.timeout(10000);

  it('bogus route should respond with 404', (done) => {
    request(server.app())
      .get('/user')
      .expect(404, done);
  });

  it('fixtures route should respond with 200', (done) => {
    request(server.app())
      .get('/api/fixtures')
      .expect(200, done);
  });
});
