const applicationController = require('./application');
const User = require('../models').User;

exports.home = (req, res) => {
  res.render('static_pages/index', { title: 'Home',
                        flash: applicationController.get_flash(req, res),
                        user: req.user,
                      });
};

exports.login = (req, res, next) => {
  res.render('static_pages/login', { title: 'Login',
                        flash: applicationController.get_flash(req, res),
                      }); 
};

exports.logout = (req, res, next) => {
  req.logout();
  req.flash('info', 'Successful logout');
  res.redirect('/login');
};