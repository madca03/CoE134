const applicationController = require('./application');
const User = require('../models').User;
const Tutor = require('../models').Tutor;
const sequelize = require('../models').Sequelize;

// GET: create user page
exports.new = (req, res, next) => {
  res.render('users/new', { title: 'Sign Up',
                            flash:  applicationController.get_flash(req, res)
                          });      
};

// POST: create user
exports.create = (req, res, next) => {
  User.findOne({
    where: {
      username: sequelize.where(
        sequelize.fn('BINARY', sequelize.col('username')),
        req.body.username )
    }
  })
  .then(user => {
    if (!user) {
      User.create({
          username: req.body.username,
          password: req.body.password,
          role: req.body.role
        })
        .then(user => {
          if (user.isTutor()) {
            Tutor.create({ user_id: user.id })
              .then(tutor => {
                req.flash('success', 'Tutor account created');
                req.login(user, function(err) {
                  if (err) { return next(err); }
                  return res.status(201).redirect('/');
                });
              })
              .catch(err => res.status(400).send(err));
          } else {
            req.flash('success', 'Account created');
            req.login(user, function(err) {
              if (err) { return next(err); }
              return res.status(201).redirect('/');
            });
          }
        })
        .catch(err => res.status(400).send(err));        
    } else {
      req.flash('error', 'Username already exists');
      res.redirect('/register');      
    }
  })
};
