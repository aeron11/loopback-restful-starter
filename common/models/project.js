'use strict';

var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var ds = app.datasources.myMongodb;//need to connect your mongodb server

module.exports = function (Project) {
  /*
    an example to query data through SQL 
    api url：http://localhost:3000/api/Projects/query-by-deptname?deptName=somename&access_token=kcVkXGPw4rd3Pl6cL36BiwPciOYwdJDNugaUirJCxAGSqjr7NrarWSFTN0vXit7a
    parameter access_token is for ACL authentication
  */
  Project.queryByDeptName = function (deptName, cb) {
    var connector = ds.connector;

    let sql;
    let res = {count: 1};
    //fuzzy query related tables via deptName
    sql = `select p.*,t.name as teamName,d.name as deptName from Project p inner join Team t on t.id=p.teamId
	    		inner join Department d on d.id=t.departmentId
	    		where d.name like '%${deptName}%';`;

    connector.execute(sql, null, (err, resultObjects) => {
      if (err)
        return cb(err);

      if (!resultObjects.length)
        return cb();

      res.rows = resultObjects.map(resultRaw => {
        const proRaw = connector.fromRow('Project', resultRaw);
        /*adding additional cols for results(Projects)*/
        proRaw.teamName = resultRaw.teamName;
        proRaw.deptName = resultRaw.deptName;

        return new Project.app.models.Project(proRaw);
      });

      cb(null, res);
    });
  };


  Project.remoteMethod('queryByDeptName', {
    accepts: [
      {arg: 'deptName', type: 'string', required: true}  //name is required
    ],
    returns: {type: 'array', arg: 'body'},
    http: {path: '/query-by-deptname', verb: 'get', status: 200}
  });
};
