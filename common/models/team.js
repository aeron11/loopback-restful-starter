'use strict';

module.exports = function (Team) {
  /*
  for this model,add beforeRemote for all requests which need to be auth and require accessToken
  call url like: http://localhost:3000/api/Teams?accessToken=kcVkXGPw4rd3Pl6cL36BiwPciOYwdJDNugaUirJCxAGSqjr7NrarWSFTN0vXit7a
  */
  Team.beforeRemote('*', function (ctx, model, next) {
    if (!ctx.req.query.accessToken) {
      ctx.res.send({
        data: {},
        error: {
          code: 403,
          message: 'parameter accessToken is required'
        }
      });
    } else {
      next();
    }
  });
};
