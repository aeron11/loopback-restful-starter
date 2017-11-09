'use strict';

var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.datasources.myMongodb;

//query db schema from your mongodb server,mongodb is required
ds.discoverSchema('Project', {schema: 'loopbackStart'}, function (err, schema) {
  if (err) throw err;

  var json = JSON.stringify(schema, null, '  ');
  console.log(json);

  ds.disconnect();
});
