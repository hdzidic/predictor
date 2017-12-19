/* global describe it after */
require('babel-core/register');

const request = require('supertest');
const server = require('../core/webserver');
const { expect } = require('chai');

const getUserByUsername = require('../api/users/db/getUserByUsername').default;
const removeUserByUsername = require('../api/users/db/removeUserByUsername').default;

describe('Passport Tests', function test() {
  this.timeout(10000);

  it('login route with no credentials should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/login')
      .expect(400, done);
  });

  it('signup route with no credentials should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .expect(400, done);
  });

  it('login route with no username should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/login')
      .send({
        password: '1234',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('login route with no pass should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/login')
      .send({
        username: 'admin',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('signup route with no pass should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        username: 'admin',
        fullname: 'James Rodriguez',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('signup route with no username should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        password: 'admin',
        fullname: 'adminator',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('signup route with no fullname should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        username: 'admin',
        password: '1234',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('signup route with invalid email should fail with 400', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        username: 'admin',
        password: '1234',
        fullname: 'adminator',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('signup with weak password should throw error', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        username: 'paqash2@gmail.com',
        password: 'pass1234',
        fullname: 'adminator',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('signup should create new user', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        username: 'paqash@gmail.com',
        password: 'Pass1234#',
        fullname: 'adminator',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.include({
          username: 'paqash@gmail.com',
          fullname: 'adminator',
        });
        return getUserByUsername('paqash@gmail.com')
          .then((user) => {
            expect(user[0]).to.be.an('Object');
            expect(user[0]).to.include({ username: 'paqash@gmail.com' });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('signup should not create new user with existing username', (done) => {
    request(server.app())
      .post('/api/users/signup')
      .send({
        username: 'paqash@gmail.com',
        password: 'Pass1234#',
        fullname: 'adminator',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Username is already taken', done);
  });

  it('login should fail with non-existing user', (done) => {
    request(server.app())
      .post('/api/users/login')
      .send({
        username: 'paqash2@gmail.com',
        password: 'Pass1234#',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('User not found', done);
  });

  it('login should fail with wrong password', (done) => {
    request(server.app())
      .post('/api/users/login')
      .send({
        username: 'paqash@gmail.com',
        password: 'Pass12345#',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Incorrect password', done);
  });

  it('login should succeed with correct data', (done) => {
    request(server.app())
      .post('/api/users/login')
      .send({
        username: 'paqash@gmail.com',
        password: 'Pass1234#',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  after(() => removeUserByUsername('paqash@gmail.com'));
});
