'use strict';

var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.datasources.myMongodb;

//mongodb server need to be installed on your dev enviroment
ds.automigrate('Department', function (err) {
  if (err) {
    throw err;
  }

  var depts = [
    {
      id: 1,
      name: 'dept 1'
    },
    {
      id: 2,
      name: 'dept 2',
      desc:'a special department'
    }
  ];
  var count = depts.length;
  depts.forEach(function (dept) {
    app.models.Department.create(dept, function (err, model) {
      if (err) {
        throw err;
      }

      console.log('Created:', model);
    });
  });
});

ds.automigrate('Team', function (err) {
  if (err) {
    throw err;
  }

  var teams = [
    {
      id: 1,
      name: 'team 1',
      departmentId: 1,
      desc:'great team'
    },
    {
      id: 2,
      name: 'team 2',
      departmentId: 1
    },
    {
      id: 3,
      name: 'team 3',
      departmentId: 2
    }
  ];
  var count = teams.length;
  teams.forEach(function (team) {
    app.models.Team.create(team, function (err, model) {
      if (err) {
        throw err;
      }

      console.log('Created:', model);
    });
  });
});

ds.automigrate('Project', function (err) {
  if (err) {
    throw err;
  }

  var projects = [
    {
      id: 1,
      name: 'project 1',
      teamId: 1,
      scrumMaster:'Aeron Zhang'
    },
    {
      id: 2,
      name: 'project 2',
      teamId: 2
    },
    {
      id: 3,
      name: 'project 3',
      teamId: 2
    },
    {
      id: 4,
      name: 'project 4',
      teamId: 1,
      desc:'this is a nice project'
    },
    {
      id: 5,
      name: 'project 5',
      teamId: 2,
      remark:'some thing remarked'
    },
    {
      id: 6,
      name: 'project 6',
      teamId: 3
    }
  ];
  var count = projects.length;
  projects.forEach(function (project) {
    app.models.Project.create(project, function (err, model) {
      if (err) {
        throw err;
      }

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});
