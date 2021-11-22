// Gets access to the environments variables/settings
require('dotenv/config');

// Connects to DB
require('./db');

// Variables
const express = require('express');
const app = express();
const hbs = require('hbs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Middleware for session/cookie & passport
require('./config/session.config')(app);
require('./config/passport.session')(app);

// This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// Handling routes
app.use('/', require('./routes/home.js'));
app.use('/', require('./routes/auth.js'));
app.use('/user', require('./routes/users.js'));
app.use('/drivers', require('./routes/drivers.js'));
// app.use('/constructors', require('./routes/constructors.js'));
// app.use('/grand-prix', require('./routes/raceTracks.js'));

// To display errorMsg when login or logout with passport
// app.use(flash());

// To handle errors
require('./error-handling')(app);

module.exports = app;