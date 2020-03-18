const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys'); //! ADD 
      // res.send(req.user);  //! DELETE
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); //logout() is from Passport.js
    res.redirect('/');

  });

  // test session
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
