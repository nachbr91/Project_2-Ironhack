// Middleware route-guard

// Checks if user is Logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  isLoggedIn,
};
