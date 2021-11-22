const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User.model.js');

module.exports = (app) => {
  passport.serializeUser((user, cb) => cb(null, user._id));

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  });

  passport.use(
    new LocalStrategy(
      // { passReqToCallback: true },
      {
        usernameField: 'username', // by default
        passwordField: 'password', // by default
      },
      (username, password, done) => {
        User.findOne({ username })
          .then((user) => {
            if (!user) {
              return done(null, false, { errorMsg: 'Incorrect username' });
            }

            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { errorMsg: 'Incorrect password' });
            }

            done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
