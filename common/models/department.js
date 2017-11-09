'use strict';

var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var ds = app.datasources.myMongodb;

module.exports = function (Department) {
  //customized department creating api
  Department.customeCreate = function (name, access_token, cb) {
    if (name === undefined || access_token === undefined) {
      return cb({
        error: {
          status: 403,
          message: 'parameters name and access_token are required'
        }
      });
    }

    Department.create({
      name: name
    }, function (err, dept) {
      if (err) {
        return cb(err);
      }
      cb(null, dept);
    });
  };

  //post method,name and access_token are required
  //authentication is required for user to do creating
  Department.remoteMethod('customeCreate', {
    accepts: [
      {arg: 'name', type: 'string', required: true},
      {arg: 'access_token', type: 'string', required: true}
    ],
    returns: {
      arg: 'body',
      type: 'object'
    },
    http: {
      path: '/custome-create',
      verb: 'post'
    }
  });

  //customized department query api
  Department.customeFind = function (name, cb) {
    if (name === undefined) {
      return cb({
        error: {
          status: 403,
          message: 'parameter name is required'
        }
      });
    }

    Department.find({
      where: {name: name}
    }, function (err, dept) {
      if (err) {
        return cb(err);
      }
      cb(null, dept);
    });
  };

  //get method，name is required
  //no authentication needed
  Department.remoteMethod('customeFind', {
    accepts: [
      {arg: 'name', type: 'string', required: true}
    ],
    returns: {
      arg: 'body',
      type: 'object'
    },
    http: {
      path: '/custome-find',
      verb: 'get'
    }
  });
};
