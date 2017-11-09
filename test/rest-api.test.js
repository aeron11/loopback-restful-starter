"use strict";

var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

describe('REST API request', function () {
  before(function (done) {
    require('./start-server');
    done();
  });

  after(function (done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  it('should not allow access without access token', function (done) {
    json('get', '/api/projects')
      .expect(401, done);
  });

  it('should login non-admin', function (done) {
    json('post', '/api/users/login')
      .send({
        email: 'test@163.com',
        password: '123456'
      })
      .expect(200, function (err, res) {
        console.log(res.body);
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an access token');
        assert.equal(res.body.userId, 1);
        
        var accessToken = res.body.id;
        json('get', '/api/projects/' + 1 + '?access_token=' + accessToken)
          .expect(200, function (err, res) {
            var projects = res.body;
            assert(typeof res.body === 'object');
            done();
          });
      });
  });
});

describe('Unexpected Usage', function () {
  it('should not crash the server when posting a bad id', function (done) {
    json('post', '/api/projects/test')
      .send({})
      .expect(404, done);
  });
});
