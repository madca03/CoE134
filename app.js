const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash-plus');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('sequelize');

const User = require('./server/models').User;

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      where: {
        username: sequelize.where(
          sequelize.fn('BINARY', sequelize.col('username')),
          username )
      }
    })
    .then(user => {
      if (!user) { 
        return done(null, false, {message: 'Incorrect username'}); 
      }
      if (user.password != password) { 
        return done(null, false, {message: 'Incorrect password'}); 
      }
      return done(null, user, {message: 'Successful login'});
    })
    .catch(err => {
      return done(err);
    });
  }
  ));

passport.serializeUser(function(user,done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: {
      id: id
    }
  })
  .then(user => done(null, user))
  .catch(err => done(err));
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: '1234567890qwerty'
}));
app.use(flash());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
  debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// add static files for css and js frontend
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  if (req.user) {
    if ((req.originalUrl === '/login') || (req.originalUrl === '/register')) {
      // check for multiple same flash messages
      // browser sometimes sends multiple requests on the same URI
      if (!req.flash().hasOwnProperty('info')) req.flash('info', 'Already signed in');
      res.redirect('/');      
    } else {
      next();
    }
  } else {
    if ((req.originalUrl !== '/login') && (req.originalUrl !== '/register')) {
      if (!req.flash().hasOwnProperty('info')) req.flash('info', 'You need to login');
      res.redirect('/login');      
    } else {
      next();
    }
  }

});

app.use('*', (req, res, next) => {
  if (req.user) {
  }
  next();
});

require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
