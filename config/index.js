// Reuse this import in order to have access to the 'body' property in requests
const express = require('express');

// Needed when we deal with cookies
const cookieParser = require('cookie-parser');

// Serves a custom favicon on each request
const favicon = require('serve-favicon');

// Global package used to 'normalize' paths  amongst different operating systems
const path = require('path');

// Middleware configuration
module.exports = (app) => {

  // To have access to 'body' property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set('views', path.join(__dirname, '..', 'views'));
  //Set the view engine to handlebars
  app.set('view engine', 'hbs');
  // Handless access to the public folder
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Handless access to the favicon
  // app.use(
  //   favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico'))
  // );
};
