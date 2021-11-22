const session = require('express-session');

const MongoStore = require('connect-mongo');

// const mongoose = require('mongoose');

module.exports = (app) => {
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basic-auth',
        // ttle => time to live
        ttl: 60 * 60 * 24, // => 1 day
      }),
    })
  );
};
