module.exports = function (app) {
  var User = app.models.User;
  var users = [
    {email: 'test@163.com', psw: '123456'}
  ];

  users.forEach(function (user) {
    //create an user for authenticated when calling api
    User.create({email: user.email, password: user.psw}, function (err, userInstance) {
      console.log(userInstance);
      User.login({email: user.email, password: user.psw, ttl: 6000000}, function (err, token) {
        if (err) {
          console.log('got an err:', err);
        } else {
          //access_token  will be return
          console.log('access_token=' + token.id);
        }
      });
    });
  });
};
