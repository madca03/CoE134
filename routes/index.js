const passport = require('passport');
const usersController = require('../server/controllers').users;
const staticPagesController = require('../server/controllers').static_pages;

module.exports = (app) => {
  app.get('/', staticPagesController.home);
  app.get('/login', staticPagesController.login);
  app.get('/logout', staticPagesController.logout);

  app.get('/register', usersController.new);
  app.post('/api/users', usersController.create);
  app.post('/api/login', 
    passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: true,
                                    successFlash: true,
                                    session: true
                                  }
    ));
};