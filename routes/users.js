// Variables
const router = require('express').Router();

// Model
const User = require('../models/User.model');

// Middleware for route guard
const { isLoggedIn } = require('../middleware/route-guard');

// GET profile page
router.get('/profile', isLoggedIn, (req, res, next) => {
  const {username} = req.user
  res.render('profile', {username} )
})

// // GET favorite page
// router.get('/favorite', isLoggedIn, (req, res) => {
//   res.render('favoriteItems')
// })

module.exports = router;