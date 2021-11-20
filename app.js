// Gets access to the environments variables/settings
require('dotenv/config');

// Connects to DB
require('./db');

// Variables
const express = require('express');
const app = express();
const hbs = require('hbs');

// Middleware for session/cookie
require('./config/session.config')(app);

// This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// Handling routes
// app.use('/', require('./routes/home.js'));
// app.use('/', require('./routes/auth.js'));
// app.use('/user', require('./routes/user.js'));
// app.use('/drivers', require('./routes/dirvers.js'));
// app.use('/constructors', require('./routes/constructors.js'));
// app.use('/race-tracks', require('./routes/raceTracks.js'));

// To handle errors
require('./error-handling')(app);

module.exports = app;